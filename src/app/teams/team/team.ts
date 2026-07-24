import { Component, input } from '@angular/core';
import { TeamInterface } from '../interfaces/team';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-team',
  imports: [MatRipple],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  data = input.required<TeamInterface>();
}
