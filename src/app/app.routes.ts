import { Routes } from '@angular/router';
import { ClickZone } from './click-zone/click-zone';
import Market from './market/market';
import { Teams } from './teams/teams';

export const routes: Routes = [
  {
    path: '',
    component: ClickZone,
  },
  {
    path: 'market',
    component: Market,
  },
  {
    path: 'teams',
    component: Teams,
  },
];
