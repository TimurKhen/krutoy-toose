import { Component, inject, OnInit, signal } from '@angular/core';
import { Telegram } from '../telegram/telegram';
import { DecimalPipe } from '@angular/common';
import { ScoreHandler } from '../handlers/score-handler/score-handler';
import { User } from '../telegram/user';
import { ShortNumberPipe } from '../pipes/short-number-pipe/short-number-pipe';

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
}
