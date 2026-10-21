import { TestBed } from '@angular/core/testing';

import { DevTelegram } from './dev';

describe('Dev', () => {
  let service: DevTelegram;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevTelegram);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
