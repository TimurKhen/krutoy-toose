import { TestBed } from '@angular/core/testing';

import { CloudStorage } from './cloud-storage';

describe('CloudStorage', () => {
  let service: CloudStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
