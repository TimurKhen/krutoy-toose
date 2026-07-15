import { Service } from '@angular/core';

@Service()
export class CloudStorage {
  private cloudStorage = window.Telegram.WebApp.CloudStorage;

  constructor() {}

  setItem(key: string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.cloudStorage.setItem(key, value, (err: any, success: boolean) => {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }

  getItem(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.cloudStorage.getItem(key, (err: any, value: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(value || null);
        }
      });
    });
  }

  removeItem(key: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.cloudStorage.removeItem(key, (err: any, success: boolean) => {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }

  getKeys(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.cloudStorage.getKeys((err: any, keys: string[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(keys);
        }
      });
    });
  }
}
