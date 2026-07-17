import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Path {
  image: string;
  link: string;
  title: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  paths: Path[] = [
    {
      image: './icons/home.svg',
      link: '/',
      title: 'Главная',
    },
    {
      image: './icons/cart.svg',
      link: '/market',
      title: 'Магазин',
    },
  ];
}
