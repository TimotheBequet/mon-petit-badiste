import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {LeaguesInterface} from "../../interfaces/leagues.interface";
import {map} from "rxjs";
import { ClassementInterface } from 'src/app/interfaces/classement.interface';
import { LeaguesService } from 'src/app/services/leagues.service';

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
  classementLeague: ClassementInterface[] | undefined = undefined;
  isLoading: boolean;
  isMyTeamLoading: boolean;

  constructor(private route: ActivatedRoute, private leagueService: LeaguesService, private cdr: ChangeDetectorRef) {
    this.isLoading = false;
    this.isMyTeamLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(league => {
        this.league = league;
        this.leagueService.getClassementLeague(league.id).subscribe((cl) => {
          this.classementLeague = cl;
          this.isLoading = false;
        });
      });
  }

  emitMyTeamLoading(myTeamLoading: boolean): void {
    this.isMyTeamLoading = myTeamLoading;
    this.cdr.detectChanges();
    console.log(myTeamLoading);
  }
}
