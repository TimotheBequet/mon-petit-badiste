import { Component, OnInit } from '@angular/core';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  myLeagues: LeaguesInterface[] = new Array<LeaguesInterface>;
  constructor(private leagueService: LeaguesService, private userService: UserService) {}

  ngOnInit(): void {
    this.leagueService.getMyLeagues(this.userService.getUser().id!).subscribe(
      leagues => {
        console.log(leagues);
        if (leagues) {
          this.myLeagues.push(leagues!);
        }
      }
    );
  }
}
