import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Telegram } from '../telegram/telegram';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { ClickReactionAnimation } from './click-reaction-animation/click-reaction-animation';
import { ScoreHandler } from '../handlers/score-handler/score-handler';

@Component({
  selector: 'app-click-zone',
  imports: [ClickReactionAnimation],
  templateUrl: './click-zone.html',
  styleUrl: './click-zone.scss',
})
export class ClickZone implements OnInit {
  userData = signal<any>(null);
  tooseButton = viewChild<ElementRef<HTMLButtonElement>>('tooseButton');
  private scoreHandler = inject(ScoreHandler);
  userScore = this.scoreHandler.currentScore;
  private tgService = inject(Telegram);
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
      console.log('Сохраняем счет в базу:', this.userScore());
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
