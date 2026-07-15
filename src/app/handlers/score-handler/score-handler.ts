import { Service, signal } from '@angular/core';

@Service()
export class ScoreHandler {
  currentScore = signal<number>(0);
}
