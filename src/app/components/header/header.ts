import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Telegram } from '../../telegram/telegram';
import { DecimalPipe } from '@angular/common';
import { ScoreHandler } from '../../handlers/score-handler/score-handler';
import { User } from '../../telegram/user';
import { ShortNumberPipe } from '../../pipes/short-number-pipe/short-number-pipe';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [DecimalPipe, ShortNumberPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  userData = signal<User | null>(null);
  private scoreHandler = inject(ScoreHandler);
  userScore = this.scoreHandler.currentScore;
  private tgService = inject(Telegram);
  isSaving = this.scoreHandler.isSavingScore;
  isShowAccurateScore = signal<boolean>(false);
  private router = inject(Router);

  currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  constructor() {
    effect(() => {
      console.log(this.currentUrl());
      if (this.currentUrl().includes('market')) {
        this.isSaving.set(false)
        // this.
      }
    });
  }

  ngOnInit() {
    this.getUserInformation();
    this.loadFromCloud();
  }

  getUserInformation() {
    const user = this.tgService.user;
    this.userData.set(user);
  }

  async loadFromCloud() {
    try {
    } catch (e) {
      console.error('Ошибка загрузки', e);
    }
  }

  showHideAccurate($event: Event) {
    $event.preventDefault();

    this.isShowAccurateScore.update((v) => !v);
  }
}
