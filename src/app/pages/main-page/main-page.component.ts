import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';
import { PopupJoinLeagueComponent } from 'src/app/components/popup-join-league/popup-join-league.component';
import { JoinLeagueInterface } from 'src/app/interfaces/joinLeague.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  isLoading: boolean = false;

  constructor(public dialog: MatDialog, 
              private leagueService: LeaguesService, 
              private userService: UserService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.leagueService.getMyLeagues(this.userService.getUser().id!).subscribe(
      leagues => {
        if (leagues) {
          this.myLeagues = leagues;
        }
        this.isLoading = false;
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupJoinLeagueComponent, {
      width: '350px',
      data: {code: this.codeLigue}
    });

    dialogRef.afterClosed().subscribe(result => {
      const joinLeagueInterface: JoinLeagueInterface = {
         code: result,
         userId: this.userService.getUser().id!
      };
      if (result != undefined) {
        this.isLoading = true;
        this.leagueService.joinLeague(joinLeagueInterface).subscribe(
          result => {
            if (result.message != undefined) {
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
                this._snackBar.open(result.error, 'Fermer', config);
              }
            }
            this.isLoading = false;
          }
        )
      }
    });
  }
}
