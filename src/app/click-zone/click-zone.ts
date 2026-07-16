import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Telegram } from '../telegram/telegram';
import { catchError, debounceTime, delay, Subject, switchMap, throwError } from 'rxjs';
import { ClickReactionAnimation } from './click-reaction-animation/click-reaction-animation';
import { ScoreHandler } from '../handlers/score-handler/score-handler';
import { DataStorage } from '../api/data-storage/data-storage';
import { ClickEffect } from './click-effect/click-effect';

@Component({
  selector: 'app-click-zone',
  imports: [ClickReactionAnimation, ClickEffect],
  templateUrl: './click-zone.html',
  styleUrl: './click-zone.scss',
})
export class ClickZone implements OnInit {
  userData = signal<any>(null);
  private tgService = inject(Telegram);
  private scoreHandler = inject(ScoreHandler);
  userScore = this.scoreHandler.currentScore;
  private dataStorage = inject(DataStorage);
  private destroyRef = inject(DestroyRef);
  private saveSubject = new Subject<void>();

  constructor() {
    this.saveSubject
      .pipe(
        debounceTime(2500),
        switchMap(async () => this.saveToCloud()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  ngOnInit() {
    this.tgService.ready();
    this.tgService.expand();

    this.getUserInformation();
  }

  onCoinClick(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    this.userScore.update((score) => score + 1);

    this.saveSubject.next();
  }

  getUserInformation() {
    const user = this.tgService.user;
    this.userData.set(user);
  }

  async saveToCloud() {
    try {
      const user = this.userData();

      if (!user || !user.id) {
        return;
      }

      this.scoreHandler.isSavingScore.set(true)
      this.dataStorage
        .click(user.id, this.userScore())
        .pipe(
          catchError((error) => {
            setTimeout(() => {
              this.scoreHandler.isSavingScore.set(false);
            }, 1500);

            return throwError(() => error);
          }),
        )
        .subscribe(() => {
          this.scoreHandler.isSavingScore.set(false);
        });

      console.log('Счет сохранен:', this.userScore());
    } catch (e) {
      console.error('Ошибка сохранения', e);
    }
  }
}
