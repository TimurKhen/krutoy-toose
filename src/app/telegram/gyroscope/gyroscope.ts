import { Service, signal } from '@angular/core';

export interface GyroscopeData {
  x: number;
  y: number;
  z: number;
}

@Service()
export class Gyroscope {
  readonly data = signal<GyroscopeData | null>(null);
  private tg = window.Telegram.WebApp;
  private gyro = window.Telegram.WebApp.Gyroscope;

  constructor() {}

  get isStarted(): boolean {
    return this.gyro.isStarted;
  }

  start(refreshRate: number = 1000): Promise<boolean> {
    return new Promise((resolve) => {
      this.gyro.start({ refresh_rate: refreshRate }, (success: boolean) => {
        if (success) {
          this.tg.onEvent('gyroscopeChanged', this.changeHandler);
        }
        resolve(success);
      });
    });
  }

  stop(): void {
    this.tg.offEvent('gyroscopeChanged', this.changeHandler);
    this.gyro.stop();
    this.data.set(null);
  }

  private readonly changeHandler = () => {
    this.data.set({
      x: this.gyro.x,
      y: this.gyro.y,
      z: this.gyro.z,
    });
  };
}
