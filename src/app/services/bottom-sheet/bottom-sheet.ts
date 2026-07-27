import { inject, input, Service } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Service()
export class BottomSheet {
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(component: any) {
    this._bottomSheet.open(component, { panelClass: 'full-width-bottom-sheet' });
  }

  closeBottomSheet(component: any) {
    this._bottomSheet.dismiss(component);
  }
}
