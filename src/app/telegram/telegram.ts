import { Service } from '@angular/core';

declare global {
  interface Window {
    Telegram: any;
  }
}

@Service()
export class Telegram {
  readonly isAvailable = typeof window !== 'undefined' && !!window.Telegram?.WebApp?.initData;
  tg: any = null;

  constructor() {
    if (this.isAvailable) {
      this.tg = window.Telegram.WebApp;
    }
  }

  get webApp() {
    return this.isAvailable ? this.tg : null;
  }

  get user() {
    if (!this.isAvailable) {
      // Имитируем пользователя Telegram для разработки на ПК
      return {
        id: 99999999,
        first_name: 'Разработчик (ПК)',
        last_name: 'Локальный',
        username: 'dev_local',
      };
    }
    return this.tg.initDataUnsafe?.user;
  }

  ready(): void {
    if (this.isAvailable) {
      this.tg.ready();
    } else {
      console.log('[TG-Mock]: App is ready');
    }
  }

  expand(): void {
    if (this.isAvailable) {
      this.tg.expand();
    } else {
      console.log('[TG-Mock]: App expanded');
    }
  }

  close(): void {
    if (this.isAvailable) {
      this.tg.close();
    } else {
      console.log('[TG-Mock]: App closed');
    }
  }
}
