import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Telegram } from '../telegram/telegram';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { ClickReactionAnimation } from './click-reaction-animation/click-reaction-animation';
import { ScoreHandler } from '../handlers/score-handler/score-handler';
import { DataStorage } from '../api/data-storage/data-storage';

@Component({
  selector: 'app-click-zone',
  imports: [ClickReactionAnimation],
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
        debounceTime(500),
        switchMap(async () => this.saveToCloud()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  ngOnInit() {
    this.tgService.ready();
    this.tgService.expand();

    this.getUserInformation();
    this.loadFromCloud();
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
        console.warn('Данные пользователя еще не загружены, сохранение пропущено');
        return;
      }

      await this.dataStorage.click(user.id, this.userScore());

      console.log('Счет сохранен:', this.userScore());
    } catch (e) {
      console.error('Ошибка сохранения', e);
    }
  }

  async loadFromCloud() {
    try {
    } catch (e) {
      console.error('Ошибка загрузки', e);
    }
  }
}
