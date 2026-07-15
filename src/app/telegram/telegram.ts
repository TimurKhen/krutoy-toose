import { Service } from '@angular/core';

declare global {
  interface Window {
    Telegram: any
  }
}

@Service()
export class Telegram {
  private tg = window.Telegram.WebApp

  constructor() {}

  get webApp() {
    return this.tg
  }

  get user() {
    return this.tg.initDataUnsafe?.user
  }

  ready() {
    this.tg.ready()
  }

  expand() {
    this.tg.expand()
  }

  close() {
    this.tg.close()
  }
}
