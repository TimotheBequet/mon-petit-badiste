import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerInterface } from 'src/app/interfaces/player.interface';
import { PlayerService } from 'src/app/services/player.service';
import { ListPlayersComponent } from '../list-players/list-players.component';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { UserService } from 'src/app/services/user.service';
import { CompoTempInterface } from 'src/app/interfaces/compo-temp.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit, AfterViewInit {
  @Input('league') league: LeaguesInterface | null = null;
  @Input('myPlayersTemp') myPlayersTemp: CompoTempInterface[] | undefined = undefined;
  @Input('myPlayers') myPlayers: PlayerInterface[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  players: PlayerInterface[] = [];
  playersTemp: CompoTempInterface[] | undefined = undefined;
  columns: Array<any> = [];
  dataSource!: MatTableDataSource<PlayerInterface>;
  displayedColumns!: Array<string>;

  constructor(public playerService: PlayerService, 
    public dialog: MatDialog, 
    public userService: UserService,
    public leagueService: LeaguesService) {}

  ngOnInit(): void {
    this.playersTemp = this.myPlayersTemp;
    this.players = this.myPlayers;
    if (this.players.length) {
      this.buildColumsPlayers();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
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
            playersBought: this.playersTemp,
            budget: this.league?.budget,
            idLeague: this.league?.id,
            idUser: this.userService.getUserId()
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.leagueService.getLeagueInfos(this.league?.id!, this.userService.getUserId()!).subscribe(league => this.league = league);
            this.leagueService.getCompoTemp(this.userService.getUserId()!, this.league?.id!).subscribe(compoTemp => this.playersTemp = compoTemp);
            this.playerService.getMyPlayers(this.userService.getUserId()!, this.league?.id!).subscribe(players => {
              this.players = players!;
              if (this.players != null && this.players.length) {
                this.buildColumsPlayers();
              }
            });
          }
        });
      }
    });
  }

  buildColumsPlayers(): void {
    this.columns = [
      {
        columnDef: 'lastName',
        header: 'Nom',
        cell: (player: PlayerInterface) => `${player.lastName}`
      },
      {
        columnDef: 'firstName',
        header: 'Prénom',
        cell: (player: PlayerInterface) => `${player.firstName}`
      },
      {
        columnDef: 'sexe',
        header: 'H/F',
        cell: (player: PlayerInterface) => `${player.sexe}`
      },
      {
        columnDef: 'age',
        header: 'Âge',
        cell: (player: PlayerInterface) => `${player.age}`
      }
    ];

    this.dataSource = new MatTableDataSource(this.players);
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }
}
