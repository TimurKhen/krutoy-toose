import { Component, input } from '@angular/core';
import { ShortNumberPipe } from '../../pipes/short-number-pipe/short-number-pipe';
import { Item } from '../interfaces/item';

@Component({
  selector: 'app-currency',
  imports: [ShortNumberPipe],
  templateUrl: './currency.html',
  styleUrl: './currency.scss',
})
export class Currency {
  data = input.required<Item>();
}
