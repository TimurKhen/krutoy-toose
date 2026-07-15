import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickZone } from './click-zone';

describe('ClickZone', () => {
  let component: ClickZone;
  let fixture: ComponentFixture<ClickZone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickZone],
    }).compileComponents();

    fixture = TestBed.createComponent(ClickZone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
