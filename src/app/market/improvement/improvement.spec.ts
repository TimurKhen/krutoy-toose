import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Improvement } from './improvement';

describe('Improvement', () => {
  let component: Improvement;
  let fixture: ComponentFixture<Improvement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Improvement],
    }).compileComponents();

    fixture = TestBed.createComponent(Improvement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
