import { Service, signal } from '@angular/core';

@Service()
export class ScoreHandler {
  currentScore = signal<number>(0);
  isSavingScore = signal<boolean>(false)
}
