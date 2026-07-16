import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, queue, tap } from 'rxjs';
import { ScoreHandler } from '../../handlers/score-handler/score-handler';
import { BalanceResponse } from './interfaces/balance-response';

@Service()
export class DataStorage {
  private scoreHandler = inject(ScoreHandler);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  register(userId: number): Observable<BalanceResponse> {
    return this.http
      .post<BalanceResponse>(
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
      .pipe(tap((balance) => this.setBalance(balance)));
  }

  click(userId: number, tapCounts: number): Observable<BalanceResponse> {
    return this.http
      .post<BalanceResponse>(
        this.apiUrl + '/tap',
        JSON.stringify({
          user_id: userId,
          tap_counts: tapCounts,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(tap((balance) => this.setBalance(balance)));
  }

  getBalance(userId: number): Observable<BalanceResponse> {
    const baseParams = new HttpParams().set('user_id', userId);

    return this.http
      .get<BalanceResponse>(this.apiUrl + '/register', {
        params: baseParams,
      })
      .pipe(tap((balance) => this.setBalance(balance)));
  }

  setBalance(balance: BalanceResponse) {
    this.scoreHandler.currentScore.set(balance.balance);
  }
}
