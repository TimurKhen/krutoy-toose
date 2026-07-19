import { Service } from '@angular/core';
import { environment } from '../../../environments/environment';

@Service()
export class DevTelegram {
  alerter(value: string) {
    if (!environment.production) {
      alert(value);
    }
  }
}
