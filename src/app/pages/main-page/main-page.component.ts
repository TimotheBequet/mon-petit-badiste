import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';
import { PopupJoinLeagueComponent } from 'src/app/components/popup-join-league/popup-join-league.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  host: {
    class: 'div-all-screen'
  }
})
export class MainPageComponent implements OnInit {

  emojiSmirkingFace: string = '&#128527;';
  myLeagues: LeaguesInterface[] = new Array<LeaguesInterface>;
  codeLigue: string = '';

  constructor(public dialog: MatDialog, private leagueService: LeaguesService, private userService: UserService) {}

  ngOnInit(): void {
    this.leagueService.getMyLeagues(this.userService.getUser().id!).subscribe(
      leagues => {
        console.log('ligues : ', leagues);
        if (leagues) {
          this.myLeagues = leagues;
        }
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupJoinLeagueComponent, {
      width: '350px',
      data: {code: this.codeLigue}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
