import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerInterface } from 'src/app/interfaces/player.interface';
import { PlayerService } from 'src/app/services/player.service';
import { ListPlayersComponent } from '../list-players/list-players.component';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { UserService } from 'src/app/services/user.service';
import { CompoTempInterface } from 'src/app/interfaces/compo-temp.interface';
import { LeaguesService } from 'src/app/services/leagues.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {
  @Input('league') league: LeaguesInterface | null = null;
  @Output() newItemEvent = new EventEmitter<boolean>();
  players: PlayerInterface[] | undefined = undefined;
  playersTemp: CompoTempInterface[] | undefined = undefined;
  constructor(public playerService: PlayerService, 
    public dialog: MatDialog, 
    public userService: UserService,
    public leagueService: LeaguesService) {}

  ngOnInit(): void {
    this.newItemEvent.emit(true);
    // TODO récupérer les bons params
    this.leagueService.getCompoTemp(this.userService.getUserId()!, this.league?.id!).subscribe(compoTemp => {
      this.playersTemp = compoTemp;
      this.playerService.getMyPlayers(this.userService.getUserId()!, this.league?.id!).subscribe(players => {
        this.players = players;
        setTimeout(() => {
          this.newItemEvent.emit(false);
        })
      });
    });
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

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.leagueService.getLeagueInfos(this.league?.id!, this.userService.getUserId()!).subscribe(league => this.league = league);
            this.leagueService.getCompoTemp(this.userService.getUserId()!, this.league?.id!).subscribe(compoTemp => this.playersTemp = compoTemp);
            this.playerService.getMyPlayers(this.userService.getUserId()!, this.league?.id!).subscribe(players => this.players = players);
          }
        });
      }
    });
  }
}
