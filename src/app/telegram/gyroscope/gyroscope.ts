import { Service, signal } from '@angular/core';

export interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

@Service()
export class Gyroscope {
  private tg = window.Telegram.WebApp;
  private gyro = window.Telegram.WebApp.Gyroscope;

  // Сигнал, хранящий текущие данные. Идеально для Zoneless.
  readonly data = signal<GyroscopeData | null>(null);

  constructor() {}

  get isStarted(): boolean {
    return this.gyro.isStarted;
  }

  // Обработчик события сохраняем как стрелочную функцию, чтобы корректно отписываться
  private readonly changeHandler = () => {
    // Обновление сигнала автоматически скажет Angular перерисовать зависимый UI
    this.data.set({
      x: this.gyro.x,
      y: this.gyro.y,
      z: this.gyro.z,
    });
  };

  start(refreshRate: number = 1000): Promise<boolean> {
    return new Promise((resolve) => {
      this.gyro.start({ refresh_rate: refreshRate }, (success: boolean) => {
        if (success) {
          // Подписываемся на нативное событие только при успешном старте
          this.tg.onEvent('gyroscopeChanged', this.changeHandler);
        }
        resolve(success);
      });
    });
  }

  stop(): void {
    this.tg.offEvent('gyroscopeChanged', this.changeHandler);
    this.gyro.stop();
    this.data.set(null); // Сбрасываем данные при остановке
  }
}
