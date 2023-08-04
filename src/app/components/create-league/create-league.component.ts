import { Component } from '@angular/core';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { LeaguesService } from 'src/app/services/leagues.service';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss']
})
export class CreateLeagueComponent {
  link: string = "/home";

  constructor(private leagueService: LeaguesService){}

  onSubmit(): void {
    const league: LeaguesInterface = {
      name: 'toto',
      id_owner: 1,
      nbPlayers: 6,
    };

    this.leagueService.createLeague(league).subscribe(retour => console.log('retour creat. ligue : ', retour));
  }
}
