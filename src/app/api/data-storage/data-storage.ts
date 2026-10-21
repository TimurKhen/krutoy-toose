import { inject, Service, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {
  catchError,
  defer,
  finalize,
  Observable,
  of,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { CloudStorage } from '../../telegram/cloudStorage/cloud-storage';
import { Telegram } from '../../telegram/telegram';
import { UserResponse } from './interfaces/user-response';

const REQUEST_TIMEOUT_MS = 5000;

const RETRY_DELAYS_MS = [15_000, 30_000, 60_000, 120_000, 300_000];

export class ServerOfflineError extends Error {
  constructor() {
    super('Server is considered offline');
  }
}

@Service()
export class DataStorage {
  unsyncedTaps = signal<number>(0);
  offlineTotalScore = signal<number>(0);
  serverOnline = signal<boolean>(true);

  private http = inject(HttpClient);
  private cloudStorage = inject(CloudStorage);
  private apiUrl = environment.apiUrl;
  private telegram = inject(Telegram);

  private consecutiveFailures = 0;
  private nextRetryAt = 0;
  private probing = false;

  async initFromCloud(): Promise<void> {
    if (this.telegram.isAvailable) {
      const [unsyncedResult, scoreResult] = await Promise.all([
        this.cloudStorage.getItem('unsynced_clicks'),
        this.cloudStorage.getItem('offline_score'),
      ]);

      this.unsyncedTaps.set(Number(unsyncedResult) || 0);
      this.offlineTotalScore.set(Number(scoreResult) || 0);
    } else {
      this.unsyncedTaps.set(0);
      this.offlineTotalScore.set(0);
    }
  }

  register(userId: number): Observable<UserResponse> {
    return this.guarded(
      this.http.post<UserResponse>(this.apiUrl + '/register', JSON.stringify({ user_id: userId }), {
        headers: { 'Content-Type': 'application/json' },
      }),
    ).pipe(tap((res) => this.setBalance(res.balance)));
  }

  getBalance(userId: number): Observable<UserResponse> {
    const params = new HttpParams().set('user_id', userId);

    return this.guarded(
      this.http.get<UserResponse>(`${this.apiUrl}/balance`, { params }),

      () => of({ balance: this.offlineTotalScore() } as UserResponse),
    ).pipe(tap((res) => this.setBalance(res.balance)));
  }

  click(userId: number, newTaps: number): Observable<UserResponse> {
    return defer(() => {
      const totalToSync = newTaps + this.unsyncedTaps();

      return this.guarded(
        this.http.post<UserResponse>(`${this.apiUrl}/tap`, {
          user_id: userId,
          tap_counts: totalToSync,
        }),

        () => {
          if (newTaps > 0) this.addUnsyncedTaps(newTaps);
          return of({ balance: this.offlineTotalScore() } as UserResponse);
        },
      ).pipe(
        tap((response) => {


          if (this.serverOnline()) {
            this.clearUnsyncedTaps();
            this.setBalance(response.balance);
          }
        }),
        catchError((err) => {
          if (newTaps > 0) {
            this.addUnsyncedTaps(newTaps);
          }
          return throwError(() => err);
        }),
      );
    });
  }

  private guarded<T>(
    request$: Observable<T>,
    offlineFallback?: () => Observable<T>,
  ): Observable<T> {
    return defer(() => {
      const isOffline = this.consecutiveFailures > 0;
      const mustWait = isOffline && (Date.now() < this.nextRetryAt || this.probing);

      if (mustWait) {
        return offlineFallback ? offlineFallback() : throwError(() => new ServerOfflineError());
      }

      if (isOffline) {
        this.probing = true;
      }

      return request$.pipe(
        timeout(REQUEST_TIMEOUT_MS),
        tap(() => this.markOnline()),
        catchError((err) => {
          if (this.isConnectionProblem(err)) {
            this.markOffline();
          }
          return throwError(() => err);
        }),
        finalize(() => (this.probing = false)),
      );
    });
  }

  private isConnectionProblem(err: unknown): boolean {
    if (err instanceof TimeoutError) return true;
    if (err instanceof HttpErrorResponse) {

      return err.status === 0 || err.status === 502 || err.status === 503 || err.status === 504;
    }
    return false;
  }

  private markOffline(): void {
    const delay = RETRY_DELAYS_MS[Math.min(this.consecutiveFailures, RETRY_DELAYS_MS.length - 1)];
    this.consecutiveFailures++;
    this.nextRetryAt = Date.now() + delay;
    this.serverOnline.set(false);
  }

  private markOnline(): void {
    this.consecutiveFailures = 0;
    this.nextRetryAt = 0;
    this.serverOnline.set(true);
  }

  private addUnsyncedTaps(newTaps: number) {
    const newUnsyncedTotal = this.unsyncedTaps() + newTaps;
    this.unsyncedTaps.set(newUnsyncedTotal);
    this.cloudStorage.setItem('unsynced_clicks', newUnsyncedTotal.toString());

    const newOfflineScore = this.offlineTotalScore() + newTaps;
    this.setBalance(newOfflineScore);
  }

  private clearUnsyncedTaps() {
    this.unsyncedTaps.set(0);
    this.cloudStorage.setItem('unsynced_clicks', '0');
  }

  private setBalance(score: number) {
    this.offlineTotalScore.set(score);
    this.cloudStorage.setItem('offline_score', score.toString());
  }
}
