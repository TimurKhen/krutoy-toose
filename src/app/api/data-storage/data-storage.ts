import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Service()
export class DataStorage {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
}
