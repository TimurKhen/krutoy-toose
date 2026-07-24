import { Component, inject, input } from '@angular/core';
import { ShortNumberPipe } from '../../pipes/short-number-pipe/short-number-pipe';
import { Item } from '../interfaces/item';
import { MatRipple } from '@angular/material/core';
import { BottomSheet } from '../../services/bottom-sheet/bottom-sheet';
import { PaymentPopup } from '../improvement/payment-popup/payment-popup';

@Component({
  selector: 'app-currency',
  imports: [ShortNumberPipe, MatRipple],
  templateUrl: './currency.html',
  styleUrl: './currency.scss',
})
export class Currency {
  data = input.required<Item>();
  private bottomSheet = inject(BottomSheet);

  buyObject($event: MouseEvent) {
    $event.preventDefault();
    this.bottomSheet.openBottomSheet(PaymentPopup);
  }
}
