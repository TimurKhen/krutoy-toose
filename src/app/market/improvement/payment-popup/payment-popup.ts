import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-payment-popup',
  imports: [],
  templateUrl: './payment-popup.html',
  styleUrl: './payment-popup.scss',
})
export class PaymentPopup {
  private bottomSheetRef = inject<MatBottomSheetRef<PaymentPopup>>(MatBottomSheetRef);

  closePopup(event: MouseEvent): void {
    event.preventDefault();
    this.bottomSheetRef.dismiss();
  }
}
