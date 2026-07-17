import { effect, inject, Injector, Service, signal } from '@angular/core';
import { DataStorage } from '../../api/data-storage/data-storage';
import { setupCloseConfirmation } from '../../telegram/closeConfirmationHandler/closeConfirmation';

@Service()
export class ScoreHandler {
  currentScore = signal<number>(0);
  isSavingScore = signal<boolean>(false);
  private dataStorage = inject(DataStorage);
  private injector = inject(Injector);

  constructor() {
    setupCloseConfirmation(this.isSavingScore, this.injector);
  }

  async init(userId: number) {
    console.log('[CS] getting from cloud')
    await this.dataStorage.initFromCloud();

    console.log('[VALUE fetching]');
    this.dataStorage.getBalance(userId).subscribe({
      next: (response) => {
        console.log('[VALUE selected from backend]');
        console.log(response);
        const unsynced = this.dataStorage.unsyncedTaps();
        this.currentScore.set(response.balance + unsynced);

        if (unsynced > 0) {
          this.syncOfflineTaps(userId);
        }
      },
      error: (err) => {
        console.log('[VALUE selected from cloud]');
        this.currentScore.set(this.dataStorage.offlineTotalScore());
        console.warn(err);
      },
    });
  }

  private syncOfflineTaps(userId: number) {
    this.isSavingScore.set(true);

    this.dataStorage.click(userId, 0).subscribe({
      next: (response) => {
        this.currentScore.set(response.balance);
        this.isSavingScore.set(false);
      },
      error: () => {
        this.isSavingScore.set(false);
      },
    });
  }
}
