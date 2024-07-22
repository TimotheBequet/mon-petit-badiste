import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerInterface } from 'src/app/interfaces/player.interface';
import { PlayerService } from 'src/app/services/player.service';
import { ListPlayersComponent } from '../list-players/list-players.component';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {
  @Input('league') league: LeaguesInterface | null = null;
  players: PlayerInterface[] | undefined = undefined;
  constructor(public playerService: PlayerService, public dialog: MatDialog, public userService: UserService) {}

  ngOnInit(): void {
    // TODO récupérer les bons params
    this.playerService.getMyPlayers(1, 2).subscribe(players => this.players = players);
  }

  openListPlayers(): void {
    this.playerService.getAllPlayers().subscribe(players => {
      if (players != undefined) {
        const dialogRef = this.dialog.open(ListPlayersComponent, {
          width: '100%',
          height: '90%',
          maxWidth: '90vw',
          data: {
            players: players,
            budget: this.league?.budget,
            idLeague: this.league?.id,
            idUser: this.userService.getUserId()
          }
        });
      }
    });
  }
}
