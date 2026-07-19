import { TestBed } from '@angular/core/testing';

import { Dev } from './dev';

describe('Dev', () => {
  let service: Dev;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dev);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
