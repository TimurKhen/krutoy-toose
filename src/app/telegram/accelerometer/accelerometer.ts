import { Service, signal } from '@angular/core';

export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

@Service()
export class Accelerometer {
  private tg = window.Telegram.WebApp;
  private acc = window.Telegram.WebApp.Accelerometer;

  readonly data = signal<AccelerometerData | null>(null);

  constructor() {}

  get isStarted(): boolean {
    return this.acc.isStarted;
  }

  private readonly changeHandler = () => {
    this.data.set({
      x: this.acc.x,
      y: this.acc.y,
      z: this.acc.z
    });
  };

  start(refreshRate: number = 1000): Promise<boolean> {
    return new Promise((resolve) => {
      this.acc.start({ refresh_rate: refreshRate }, (success: boolean) => {
        if (success) {
          this.tg.onEvent('accelerometerChanged', this.changeHandler);
        }
        resolve(success);
      });
    });
  }

  stop(): void {
    this.tg.offEvent('accelerometerChanged', this.changeHandler);
    this.acc.stop();
    this.data.set(null);
  }
}
