import { Service, signal } from '@angular/core';

@Service()
export class ScoreHandler {
  currentScore = signal<number>(1231231231230);
  isSavingScore = signal<boolean>(false)
}
