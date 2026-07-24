import { Component, computed, inject, input } from '@angular/core';
import { Item } from '../interfaces/item';
import { ScoreHandler } from '../../handlers/score-handler/score-handler';
import { ShortNumberPipe } from '../../pipes/short-number-pipe/short-number-pipe';
import { MatRipple } from '@angular/material/core';
import { BottomSheet } from '../../services/bottom-sheet/bottom-sheet';
import { PaymentPopup } from './payment-popup/payment-popup';

@Component({
  selector: 'app-improvement',
  imports: [ShortNumberPipe, MatRipple],
  templateUrl: './improvement.html',
  styleUrl: './improvement.scss',
})
export class Improvement {
  private scoreHandler = inject(ScoreHandler);
  private userScore = this.scoreHandler.currentScore;


  data = input.required<Item>();
  canBuy = computed(() => this.userScore() >= this.data().price);

}
