import { Component, computed, effect, inject, signal } from '@angular/core';
import { SearchBar } from './search-bar/search-bar';
import { Team } from './team/team';
import { TeamsService } from '../api/teams/teams';
import { environment } from '../../environments/environment';
import { DevTelegram } from '../telegram/devFunctions/dev';
import { MatRipple } from '@angular/material/core';


@Component({
  selector: 'app-teams',
  imports: [SearchBar, Team, MatRipple],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams {
  private teamService = inject(TeamsService);
  private devService = inject(DevTelegram);

  teams = computed(() => this.teamService.searchTeam.value() ?? []);
  search = this.teamService.searchTeam;

  showMochedResults = signal<boolean>(false);

  constructor() {
    effect(() => {
      const data = this.teamService.searchTeam.value();

      this.devService.alerter(JSON.stringify(data));

      if (data) {
        console.log('Данные успешно обновлены в компоненте:', data);
      } else {
        console.log(data);

        if (environment.production) return;

        if (this.showMochedResults()) {
          this.setMochedValues();
        }
      }
    });
  }

  setSearch($event: Event) {
    $event.preventDefault();

    this.showMochedResults.update((v) => !v);

    if (this.showMochedResults()) {
      this.setMochedValues();
    } else {
      this.teamService.searchTeam.set([]);
    }
  }

  setMochedValues() {
    this.teamService.searchTeam.set([
      {
        id: 0,
        name: 'МММ',
        head_id: 1,
        members: [],
        total_budget: 0,
        global_rating: 0,
        min_budget: 0,
        max_members_count: 0,
      },
      {
        id: 1,
        name: 'МММ 2',
        head_id: 5,
        members: [],
        total_budget: 0,
        global_rating: 0,
        min_budget: 0,
        max_members_count: 0,
      },
    ]);
  }
}
