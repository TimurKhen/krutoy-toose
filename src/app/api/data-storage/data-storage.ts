import { inject, Service, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CloudStorage } from '../../telegram/cloudStorage/cloud-storage';
import { Telegram } from '../../telegram/telegram';
import { UserResponse } from './interfaces/user-response';

@Service()
export class DataStorage {
  unsyncedTaps = signal<number>(0);
  offlineTotalScore = signal<number>(0);
  private http = inject(HttpClient);
  private cloudStorage = inject(CloudStorage);
  private apiUrl = environment.apiUrl;
  private telegram = inject(Telegram);

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
    return this.http
      .post<UserResponse>(
        this.apiUrl + '/register',
        JSON.stringify({
          user_id: userId,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(tap((balance) => this.setBalance(balance.balance)));
  }

  getBalance(userId: number): Observable<UserResponse> {
    const params = new HttpParams().set('user_id', userId);

    return this.http
      .get<UserResponse>(`${this.apiUrl}/balance`, { params })
      .pipe(tap((response) => this.setBalance(response.balance)));
  }

  click(userId: number, newTaps: number): Observable<UserResponse> {
    const totalToSync = newTaps + this.unsyncedTaps();

    return this.http
      .post<UserResponse>(`${this.apiUrl}/tap`, {
        user_id: userId,
        tap_counts: totalToSync,
      })
      .pipe(
        tap((response) => {
          this.clearUnsyncedTaps();
          this.setBalance(response.balance);
        }),
        catchError((err) => {
          if (newTaps > 0) {
            this.addUnsyncedTaps(newTaps);
          }
          return throwError(() => err);
        }),
      );
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
