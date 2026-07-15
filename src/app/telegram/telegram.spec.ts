import { TestBed } from '@angular/core/testing';

import { Telegram } from './telegram';

describe('Telegram', () => {
  let service: Telegram;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Telegram);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
