import { Component, input } from '@angular/core';
import { ShortNumberPipe } from '../../pipes/short-number-pipe/short-number-pipe';
import { Item } from '../interfaces/item';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-currency',
  imports: [ShortNumberPipe, MatRipple],
  templateUrl: './currency.html',
  styleUrl: './currency.scss',
})
export class Currency {
  data = input.required<Item>();
}
