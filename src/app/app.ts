import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Telegram } from './telegram/telegram';
import { DataStorage } from './api/data-storage/data-storage';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private tgService = inject(Telegram);
  private dataService = inject(DataStorage);

  ngOnInit() {
    const user = this.tgService.user;
    this.dataService.register(user.id).subscribe((data) => console.log(data));
  }
}
