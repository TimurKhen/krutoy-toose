import { Component, inject, input } from '@angular/core';
import { ShortNumberPipe } from '../../pipes/short-number-pipe/short-number-pipe';
import { Item } from '../interfaces/item';
import { MatRipple } from '@angular/material/core';
import { BottomSheet } from '../../services/bottom-sheet/bottom-sheet';
import { PaymentPopup } from './payment-popup/payment-popup';
import { Payment } from './payment-service/payment';

@Component({
  selector: 'app-currency',
  imports: [ShortNumberPipe, MatRipple],
  templateUrl: './currency.html',
  styleUrl: './currency.scss',
})
export class Currency {
  private bottomSheet = inject(BottomSheet);
  private paymentService = inject(Payment);

  data = input.required<Item>();

  buyObject($event: MouseEvent) {
    $event.preventDefault();
    this.paymentService.setPaymentInfo(this.data());
    this.bottomSheet.openBottomSheet(PaymentPopup);
  }
}
