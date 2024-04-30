import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {LeaguesInterface} from "../../interfaces/leagues.interface";
import {map} from "rxjs";

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(league => this.league = league);
  }
}
