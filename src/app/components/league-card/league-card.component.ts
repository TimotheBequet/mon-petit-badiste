import { Component, Input } from '@angular/core';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-league-card',
  templateUrl: './league-card.component.html',
  styleUrls: ['./league-card.component.scss']
})
export class LeagueCardComponent {
  @Input('league') league: LeaguesInterface = {} as LeaguesInterface;

  constructor(private clipboard: Clipboard, private snackBar: MatSnackBar) {}

  copyCode(): void {
    this.clipboard.copy(this.league.code!);
    const config = new MatSnackBarConfig();
    config.panelClass = ['success'];
    config.verticalPosition = 'bottom';
    config.duration = 3000;
    this.snackBar.open('Code de la ligue copié dans le presse-papier.', 'Fermer', config);
  }
}
