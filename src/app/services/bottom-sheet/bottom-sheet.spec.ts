import { TestBed } from '@angular/core/testing';

import { BottomSheet } from './bottom-sheet';

describe('BottomSheet', () => {
  let service: BottomSheet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BottomSheet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
