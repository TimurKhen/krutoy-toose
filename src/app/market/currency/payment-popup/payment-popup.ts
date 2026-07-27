import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Payment } from '../payment-service/payment';
import { ClickEffect } from '../../../click-zone/click-effect/click-effect';
import { ClickReactionAnimation } from '../../../click-zone/click-reaction-animation/click-reaction-animation';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-payment-popup',
  imports: [ClickEffect, ClickReactionAnimation, NgOptimizedImage, DecimalPipe],
  templateUrl: './payment-popup.html',
  styleUrl: './payment-popup.scss',
})
export class PaymentPopup {
  private bottomSheetRef = inject<MatBottomSheetRef<PaymentPopup>>(MatBottomSheetRef);
  private paymentService = inject(Payment);
  paymentData = this.paymentService.paymentData;
  readonly coeff = 1.8199;

  closePopup(event: MouseEvent): void {
    event.preventDefault();
    this.bottomSheetRef.dismiss();
  }

  protected readonly Math = Math;
}
