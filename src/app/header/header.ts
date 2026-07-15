import { Component, inject, OnInit, signal } from '@angular/core';
import { Telegram } from '../telegram/telegram';
import { DecimalPipe } from '@angular/common';
import { ScoreHandler } from '../handlers/score-handler/score-handler';

@Component({
  selector: 'app-header',
  imports: [DecimalPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  userData = signal<any>(null);
  private scoreHandler = inject(ScoreHandler);
  userScore = this.scoreHandler.currentScore;
  private tgService = inject(Telegram);

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
