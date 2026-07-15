import { TestBed } from '@angular/core/testing';

import { ScoreHandler } from './score-handler';

describe('ScoreHandler', () => {
  let service: ScoreHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
