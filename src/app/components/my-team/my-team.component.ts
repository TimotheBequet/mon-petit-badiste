import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerInterface } from 'src/app/interfaces/player.interface';
import { PlayerService } from 'src/app/services/player.service';
import { ListPlayersComponent } from '../list-players/list-players.component';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { UserService } from 'src/app/services/user.service';
import { CompoTempInterface } from 'src/app/interfaces/compo-temp.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit, AfterViewInit {
  @Input('league') league: LeaguesInterface | null = null;
  @Input('myPlayersTemp') myPlayersTemp: CompoTempInterface[] = [];
  @Input('myPlayers') myPlayers: PlayerInterface[] = [];
  @ViewChild('sortTemp') sortTemp!: MatSort;
  @ViewChild('sortTeam') sortTeam!: MatSort;
  players: PlayerInterface[] = [];
  playersTemp: CompoTempInterface[] = [];
  columnsTeam: Array<any> = [];
  dataSourceTeam!: MatTableDataSource<PlayerInterface>;
  displayedColumnsTeam!: Array<string>;
  columnsTemp: Array<any> = [];
  dataSourceTemp!: MatTableDataSource<CompoTempInterface>;
  displayedColumnsTemp!: Array<string>;

  constructor(public playerService: PlayerService, 
    public dialog: MatDialog, 
    public userService: UserService,
    public leagueService: LeaguesService) {}

  ngOnInit(): void {
    this.playersTemp = this.myPlayersTemp;
    if (this.playersTemp.length) {
      console.log("playersTemp : ", this.playersTemp);
      this.buildColumnsCompoTemp();
    }

    this.players = this.myPlayers;
    if (this.players.length) {
      this.buildColumnsPlayers();
    }
  }

  ngAfterViewInit(): void {
    this.dataSourceTeam.sort = this.sortTeam;
    this.dataSourceTemp.sort = this.sortTemp;
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
            this.leagueService.getCompoTemp(this.userService.getUserId()!, this.league?.id!).subscribe(compoTemp => {
              this.playersTemp = compoTemp!;
              if (this.playersTemp != null && this.playersTemp.length) {
                this.buildColumnsCompoTemp();
              }
            });
            this.playerService.getMyPlayers(this.userService.getUserId()!, this.league?.id!).subscribe(players => {
              this.players = players!;
              if (this.players != null && this.players.length) {
                this.buildColumnsPlayers();
              }
            });
          }
        });
      }
    });
  }

  buildColumnsPlayers(): void {
    this.columnsTeam = [
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
      },
      {
        columnDef: 'sigle',
        header: 'Club',
        cell: (player: PlayerInterface) => `${player.sigle} ${player.dept}`
      },
      {
        columnDef: 'tousClassements',
        header: 'Classement',
        cell: (player: PlayerInterface) => `${player.tousClassements}`
      }
    ];

    this.dataSourceTeam = new MatTableDataSource(this.players);
    this.displayedColumnsTeam = this.columnsTeam.map(c => c.columnDef);
  }

  buildColumnsCompoTemp(): void {
    this.columnsTemp = [
      {
        columnDef: 'nomPlayer',
        header: 'Nom',
        cell: (temp: CompoTempInterface) => `${temp.nomPlayer}`
      },
      {
        columnDef: 'prenomPlayer',
        header: 'Prénom',
        cell: (temp: CompoTempInterface) => `${temp.prenomPlayer}`
      },
      {
        columnDef: 'sexe',
        header: 'H/F',
        cell: (temp: CompoTempInterface) => `${temp.sexe}`
      },
      {
        columnDef: 'age',
        header: 'Âge',
        cell: (temp: CompoTempInterface) => `${temp.age}`
      },
      {
        columnDef: 'club',
        header: 'Club',
        cell: (temp: CompoTempInterface) => `${temp.club}`
      },
      {
        columnDef: 'classement',
        header: 'Classement',
        cell: (temp: CompoTempInterface) => `${temp.classement}`
      },
      {
        columnDef: 'prixPlayer',
        header: 'Prix',
        cell: (temp: CompoTempInterface) => `${temp.prixPlayer}`
      }
    ];

    this.dataSourceTemp = new MatTableDataSource(this.playersTemp);
    this.displayedColumnsTemp = this.columnsTemp.map(c => c.columnDef);
  }
}
