import { TestBed } from '@angular/core/testing';

import { DataStorage } from './data-storage';

describe('DataStorage', () => {
  let service: DataStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
