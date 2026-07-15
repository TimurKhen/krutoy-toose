import { Service } from '@angular/core';

declare global {
  interface Window {
    Telegram: any;
  }
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  allows_write_to_pm: boolean;
  photo_url: string;
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

  get user(): User {
    if (!this.isAvailable) {
      return {
        id: 99999999,
        first_name: 'Разработчик',
        last_name: 'Локальный',
        username: 'dev_local',
        language_code: "ru",
        allows_write_to_pm: true,
        photo_url: 't'
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
