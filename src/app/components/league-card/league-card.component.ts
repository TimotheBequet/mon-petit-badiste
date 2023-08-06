import { Component, Input } from '@angular/core';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';

@Component({
  selector: 'app-league-card',
  templateUrl: './league-card.component.html',
  styleUrls: ['./league-card.component.scss']
})
export class LeagueCardComponent {
  @Input('league') league: LeaguesInterface = {} as LeaguesInterface;
}
