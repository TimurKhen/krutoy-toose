import { TestBed } from '@angular/core/testing';

import { Accelerometer } from './accelerometer';

describe('Accelerometer', () => {
  let service: Accelerometer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Accelerometer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
