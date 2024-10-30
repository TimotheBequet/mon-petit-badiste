import {AfterViewChecked, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {LeaguesInterface} from "../../interfaces/leagues.interface";
import {map} from "rxjs";
import { ClassementInterface } from 'src/app/interfaces/classement.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private route: ActivatedRoute, private leagueService: LeaguesService, private userService: UserService) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(league => {
        this.league = league;
        this.leagueService.getClassementLeague(league.id).subscribe((cl) => this.classementLeague = cl);
      });
  }
}
