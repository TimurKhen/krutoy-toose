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
class Market {
  improvements = signal<Item[]>([
    {
      title: 'Дополнительный лосяра',
      description: '+1 лосяра за тап',
      price: 10000,
      imageUrl: './images/image-3.png',
      id: 1,
      can_buy: true,
    },
    {
      title: 'Серебряный туз',
      description: 'x2 лосяр за тап',
      price: 1000,
      imageUrl: './coins/gold.png',
      id: 2,
      can_buy: false,
    },
  ]);

  currencies = signal<Item[]>([
    {
      title: '10К лосяр',
      description: null,
      price: 10,
      imageUrl: './images/image-3.png',
      id: 4,
      can_buy: true,
    },
    {
      title: '1М лосяр',
      description: null,
      price: 150,
      imageUrl: './coins/gold.png',
      id: 3,
      can_buy: false,
    },
  ]);
}

export default Market;


// TODO: попап с оплатой
