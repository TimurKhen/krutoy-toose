import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Item } from './interfaces/item';
import { Improvement } from './improvement/improvement';
import { Currency } from './currency/currency';

@Component({
  selector: 'app-market',
  imports: [Improvement, Currency],
  templateUrl: './market.html',
  styleUrl: './market.scss',
})
export class Market {
  improvements = signal<Item[]>([
    {
      title: 'Дополнительный лосяра',
      description: '+1 лосяра за тап',
      price: 10000,
      imageUrl: './images/image-3.png',
    },
    {
      title: 'Серебряный туз',
      description: 'x2 лосяр за тап',
      price: 1000,
      imageUrl: './coins/gold.png',
    },
  ]);

  currencies = signal<Item[]>([
    {
      title: '10К лосяр',
      description: null,
      price: 10,
      imageUrl: './images/image-3.png',
    },
    {
      title: '1М лосяр',
      description: null,
      price: 150,
      imageUrl: './coins/gold.png',
    },
  ]);
}


// TODO: попап с оплатой
