import { inject, Service, signal } from '@angular/core';
import { HttpClient, HttpParams, httpResource, HttpResourceRef } from '@angular/common/http';
import { TeamInterface } from '../../teams/interfaces/team';
import { catchError, Observable, of, timeout, TimeoutError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';

@Service()
export class TeamsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  searchValue = signal<string>('');
  searchTimedOut = signal<boolean>(false);

  searchTeam = rxResource({
    params: () => ({ value: this.searchValue() }),
    stream: ({ params }) => {
      this.searchTimedOut.set(false);

      const httpParams = new HttpParams().set('value', params.value);

      return this.http.get<TeamInterface[]>(this.apiUrl + '/teams', { params: httpParams }).pipe(
        timeout(5000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            this.searchTimedOut.set(true);
          }
          return of([] as TeamInterface[]);
        }),
      );
    },
  });

  enterTeam(userId: number, teamId: number) {
    return this.http.post(this.apiUrl + '/teams/' + teamId,
      JSON.stringify({'user_id': userId}),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      })
  }

  createTeam(name: string, min_budget: number, max_members: number) {
    return this.http.post(
      this.apiUrl + '/teams',
      JSON.stringify({
        name: name,
        min_budget: min_budget,
        max_members_count: max_members,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }

  getTeam(teamId: number) {
    const params = new HttpParams().set('id', teamId);

    return this.http.get<TeamInterface[]>(this.apiUrl + '/teams', {
      params: params,
    });
  }
}
