import { TestBed } from '@angular/core/testing';

import { Gyroscope } from './gyroscope';

describe('Gyroscope', () => {
  let service: Gyroscope;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gyroscope);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
