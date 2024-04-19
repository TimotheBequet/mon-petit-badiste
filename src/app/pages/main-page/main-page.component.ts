import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';
import { PopupJoinLeagueComponent } from 'src/app/components/popup-join-league/popup-join-league.component';
import { JoinLeagueInterface } from 'src/app/interfaces/joinLeague.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  emojiEyesStars: string = '&#129321;';
  myLeagues: LeaguesInterface[] = new Array<LeaguesInterface>;
  codeLigue: string = '';

  constructor(public dialog: MatDialog, 
              private leagueService: LeaguesService, 
              private userService: UserService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.leagueService.getMyLeagues(this.userService.getUser().id!).subscribe(
      leagues => {
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
      const joinLeagueInterface: JoinLeagueInterface = {
         code: result,
         id_user: this.userService.getUser().id!
      };
      this.leagueService.joinLeague(joinLeagueInterface).subscribe(
        result => {
          console.log('DATAAAA  : ', result);
          if (result != undefined && result.id != undefined) {
            // tout est ok, on récupère les ligues
            this.leagueService.getMyLeagues(this.userService.getUser().id!).subscribe(
              leagues => {
                if (leagues) {
                  this.myLeagues = leagues;
                }
              }
            );
          } else if (result !== undefined && result.error !== undefined) {
            const config = new MatSnackBarConfig();
            config.panelClass = ['error'];
            config.verticalPosition = 'bottom';
            config.duration = 5000;
            // gestion des cas d'erreur :
            if (result.idLeague !== undefined && result.idLeague === null) {
              // code invalide
              this._snackBar.open('Code invalide !', 'Fermer', config);
            }
          }
        }
      )
    });
  }
}
