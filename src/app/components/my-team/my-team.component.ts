import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerInterface } from 'src/app/interfaces/player.interface';
import { PlayerService } from 'src/app/services/player.service';
import { ListPlayersComponent } from '../list-players/list-players.component';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {
  players: PlayerInterface[] | undefined = undefined;
  constructor(public playerService: PlayerService, public dialog: MatDialog) {}

  ngOnInit(): void {
    // TODO récupérer les bons params
    this.playerService.getMyPlayers(1, 2).subscribe(players => this.players = players);
  }

  openListPlayers(): void {
    this.playerService.getAllPlayers().subscribe(players => {
      if (players != undefined) {
        console.log('players : ', players);
        
        const dialogRef = this.dialog.open(ListPlayersComponent, {
          width: '100%',
          height: '90%',
          maxWidth: '90vw',
          data: players
        });
      }
    });
  }
}
