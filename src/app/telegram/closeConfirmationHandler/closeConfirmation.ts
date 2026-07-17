import { computed, effect, inject, Injector, signal } from '@angular/core';
import { Telegram } from '../telegram';

export function setupCloseConfirmation(
  toTgSignal: ReturnType<typeof signal<boolean>> | ReturnType<typeof computed<boolean>>,
  injector?: Injector,
) {
  const telegram = inject(Telegram);

  return effect(
    () => {
      if (toTgSignal()) {
        telegram.enableClosingConfirmation();
      } else {
        telegram.disableClosingConfirmation();
      }
    },
    { injector },
  );
}
