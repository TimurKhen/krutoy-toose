import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Telegram } from '../telegram/telegram';
import { catchError, debounceTime, delay, EMPTY, Subject, switchMap, tap } from 'rxjs';
import { ClickReactionAnimation } from './click-reaction-animation/click-reaction-animation';
import { ScoreHandler } from '../handlers/score-handler/score-handler';
import { DataStorage } from '../api/data-storage/data-storage';
import { ClickEffect } from './click-effect/click-effect';

@Component({
  selector: 'app-click-zone',
  standalone: true,
  imports: [ClickReactionAnimation, ClickEffect],
  templateUrl: './click-zone.html',
  styleUrl: './click-zone.scss',
})
export class ClickZone implements OnInit {
  userData = signal<any>(null);

  private pendingClicks = 0;

  private tgService = inject(Telegram);
  private scoreHandler = inject(ScoreHandler);
  userScore = this.scoreHandler.currentScore;
  private dataStorage = inject(DataStorage);
  private destroyRef = inject(DestroyRef);
  private saveSubject = new Subject<void>();

  constructor() {
    this.saveSubject
      .pipe(
        debounceTime(500),
        switchMap(() => {
          const user = this.userData();

          const clicksToSave = this.pendingClicks;

          if (!user || !user.id || clicksToSave === 0) return EMPTY;

          this.pendingClicks = 0;
          this.scoreHandler.isSavingScore.set(true);

          return this.dataStorage.click(user.id, clicksToSave).pipe(
            catchError((error) => {
              console.error('Ошибка сохранения', error);

              this.pendingClicks += clicksToSave;

              setTimeout(() => this.scoreHandler.isSavingScore.set(false), 1500);
              return EMPTY;
            }),
            delay(1000),
            tap(() => {
              this.scoreHandler.isSavingScore.set(false);
            }),
          );
        }),
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
      event.stopPropagation();
    }

    this.userScore.update((score) => score + 1);

    this.pendingClicks += 1;

    this.saveSubject.next();
  }

  getUserInformation() {
    const user = this.tgService.user;
    this.userData.set(user);
  }
}
