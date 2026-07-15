import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Telegram } from './telegram/telegram';
import { CloudStorage } from './telegram/cloudStorage/cloud-storage';
import { Gyroscope } from './telegram/gyroscope/gyroscope';
import { Accelerometer } from './telegram/accelerometer/accelerometer';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  public gyroService = inject(Gyroscope);
  public accelService = inject(Accelerometer);
  userName = signal<string>('');
  cloudValue = signal<string | null>(null);
  private tgService = inject(Telegram);
  private cloudService = inject(CloudStorage);

  ngOnInit() {
    this.tgService.ready();
    this.tgService.expand();

    this.getUserInformation();
  }

  getUserInformation() {
    const user = this.tgService.user;
    if (user) {
      this.userName.set(user.first_name);
    }
  }

  closeApp() {
    this.tgService.close();
  }

  async saveToCloud() {
    try {
      await this.cloudService.setItem('my_secret_key', 'Hello Zoneless Angular 22!');
    } catch (e) {
      console.error('Ошибка сохранения', e);
    }
  }

  async loadFromCloud() {
    try {
      const value = await this.cloudService.getItem('my_secret_key');
      this.cloudValue.set(value);
    } catch (e) {
      console.error('Ошибка загрузки', e);
    }
  }

  async startSensors() {
    const refreshRate = 500;

    await Promise.all([this.gyroService.start(refreshRate), this.accelService.start(refreshRate)]);
  }

  stopSensors() {
    this.gyroService.stop();
    this.accelService.stop();
  }

  ngOnDestroy() {
    this.stopSensors();
  }
}
