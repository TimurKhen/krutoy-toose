import { inject, Service } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from '../../market/interfaces/item';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserResponse } from '../data-storage/interfaces/user-response';

@Service()
export class MarketService {
  private http = inject(HttpClient);

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.apiUrl}/market`).pipe(
      map((data: Item[]) => {
        return [...data].sort((a, b) => Number(a.can_buy) - Number(b.can_buy));
      }),
    );
  }

  buyItems(userId: number, itemId: number): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.apiUrl}/market/buy`, {
      user_id: userId,
      item_id: itemId,
    });
  }
}
