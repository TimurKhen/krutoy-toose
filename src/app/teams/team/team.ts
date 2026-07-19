import { Component, input } from '@angular/core';
import { TeamInterface } from '../interfaces/team';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  data = input.required<TeamInterface>();
}
