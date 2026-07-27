import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPopup } from './payment-popup';

describe('PaymentPopup', () => {
  let component: PaymentPopup;
  let fixture: ComponentFixture<PaymentPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
