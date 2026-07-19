import { Component, computed, effect, inject } from '@angular/core';
import { SearchBar } from './search-bar/search-bar';
import { Team } from './team/team';
import { TeamsService } from '../api/teams/teams';
import { environment } from '../../environments/environment';
import { DevTelegram } from '../telegram/devFunctions/dev';


@Component({
  selector: 'app-teams',
  imports: [SearchBar, Team],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams {
  private teamService = inject(TeamsService);
  private devService = inject(DevTelegram);

  teams = computed(() => this.teamService.searchTeam.value() ?? []);
  search = this.teamService.searchTeam;

  constructor() {
    effect(() => {
      const data = this.teamService.searchTeam.value();

      this.devService.alerter(JSON.stringify(data));

      if (data) {
        console.log('Данные успешно обновлены в компоненте:', data);
      } else {
        console.log(data)

        if (environment.production) return

        // this.teamService.searchTeam.set([
        //   {
        //     id: 0,
        //     name: 'МММ',
        //     head_id: 1,
        //     members: [2, 3, 4],
        //   },
        //   {
        //     id: 1,
        //     name: 'МММ 2',
        //     head_id: 5,
        //     members: [6, 7, 8, 9, 10, 11, 12],
        //   },
        // ]);
      }
    });
  }
}
