import { inject, Service, signal } from '@angular/core';
import { DataStorage } from '../../api/data-storage/data-storage';

@Service()
export class ScoreHandler {
  currentScore = signal<number>(0);
  isSavingScore = signal<boolean>(false);
  private dataStorage = inject(DataStorage);

  async init(userId: number) {
    await this.dataStorage.initFromCloud();
    this.currentScore.set(this.dataStorage.offlineTotalScore());

    this.dataStorage.getBalance(userId).subscribe({
      next: (response) => {
        const unsynced = this.dataStorage.unsyncedTaps();
        this.currentScore.set(response.balance + unsynced);

        if (unsynced > 0) {
          this.syncOfflineTaps(userId);
        }
      },
      error: (err) => {
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
