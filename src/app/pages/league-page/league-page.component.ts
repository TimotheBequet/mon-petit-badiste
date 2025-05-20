import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {LeaguesInterface} from "../../interfaces/leagues.interface";
import {map} from "rxjs";
import { ClassementInterface } from 'src/app/interfaces/classement.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';
import { PlayerInterface } from 'src/app/interfaces/player.interface';
import { CompoTempInterface } from 'src/app/interfaces/compo-temp.interface';
import { PlayerService } from 'src/app/services/player.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-league-page',
  templateUrl: './league-page.component.html',
  styleUrls: ['./league-page.component.scss'],
  host: {
    class: 'div-all-screen'
  }
})
export class LeaguePageComponent implements OnInit {
  league: LeaguesInterface | null = null;
  link: string = "/home";
  classementLeague: ClassementInterface[] = [];
  isLoading: boolean;
  isMyTeamLoading: boolean;
  myPlayers: PlayerInterface[] | undefined = undefined;
  myPlayersTemp: CompoTempInterface[] | undefined = undefined;
  activeTab: string = 'classement';
  columns: Array<any> = [];
  dataSource!: MatTableDataSource<ClassementInterface>;
  displayedColumns!: Array<string>;

  constructor(private route: ActivatedRoute, private leagueService: LeaguesService, private userService: UserService, private playerService: PlayerService) {
    this.isLoading = false;
    this.isMyTeamLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.isMyTeamLoading = true;

    this.route.paramMap
    .pipe(map(() => window.history.state))
    .subscribe(league => {
      this.league = league;
      this.leagueService.getClassementLeague(league.id).subscribe((cl) => {
        this.classementLeague = cl!;
        if (this.classementLeague.length) {
          this.buildColumsClassement();
        }
        this.isLoading = false;

        this.leagueService.getCompoTemp(this.userService.getUserId()!, this.league?.id!).subscribe(compoTemp => {
          this.myPlayersTemp = compoTemp;

          this.playerService.getMyPlayers(this.userService.getUserId()!, this.league?.id!).subscribe(players => {
            this.myPlayers = players;
            this.isMyTeamLoading = false;
          });
        });
      });
    });
  }

  isNotLoading(): boolean {
    return !this.isMyTeamLoading && !this.isLoading;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

    buildColumsClassement(): void {
    this.columns = [
      {
        columnDef: 'classement',
        header: 'Classement',
        cell: (classement: ClassementInterface) => `${classement.classement}`
      },
      {
        columnDef: 'pseudo',
        header: 'Pseudo',
        cell: (classement: ClassementInterface) => `${classement.pseudo}`
      },
      {
        columnDef: 'score',
        header: 'Score',
        cell: (classement: ClassementInterface) => `${classement.score}`
      }
    ];

    this.dataSource = new MatTableDataSource(this.classementLeague);
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }
}
