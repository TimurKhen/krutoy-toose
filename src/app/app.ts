import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Telegram } from './telegram/telegram';
import { DataStorage } from './api/data-storage/data-storage';
import { Footer } from './components/footer/footer';
import { ScoreHandler } from './handlers/score-handler/score-handler';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private tgService = inject(Telegram);
  private dataService = inject(DataStorage);
  private scoreHandler = inject(ScoreHandler);

  ngOnInit() {
    const user = this.tgService.user;
    this.dataService.register(user.id).subscribe();

    if (user?.id) {
      this.scoreHandler.init(user.id);
    }
  }
}
