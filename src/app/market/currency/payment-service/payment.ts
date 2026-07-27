import { Service, signal } from '@angular/core';
import { Item } from '../../interfaces/item';

@Service()
export class Payment {
  private _paymentInfo = signal<Item | null>(null);
  paymentData = this._paymentInfo.asReadonly()

  setPaymentInfo(value: Item | null) {
    this._paymentInfo.set(value);
  }
}
