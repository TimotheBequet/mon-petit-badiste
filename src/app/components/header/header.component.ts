import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LeaguesService } from 'src/app/services/leagues.service';
import { JoinLeagueInterface } from 'src/app/interfaces/joinLeague.interface';
import { PopupJoinLeagueComponent } from 'src/app/components/popup-join-league/popup-join-league.component';
import { CommonService } from 'src/app/services/common.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLogged: boolean = false;
  userName: string = '';
  user: UserInterface | null = null;
  private readonly destroy$ = new Subject<void>();
  connexion: string = 'Connexion';
  inscription: string = 'Inscription';
  creation: string = 'Créer une ligue';
  rejoindre: string = 'Rejoindre une ligue';
  codeLigue: string = '';
  isLoading: boolean = false;

  constructor(public dialog: MatDialog, 
    private userService: UserService, 
    private _snackBar: MatSnackBar,
    private leagueService: LeaguesService,
    private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        this.isUserLogged = this.userService.isUserLogged();
        this.userName = this.userService.getUserName();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

    openDialog(): void {
      const dialogRef = this.dialog.open(PopupJoinLeagueComponent, {
        width: '350px',
        data: {code: this.codeLigue}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        const user = this.userService.getUser();
        if (!user) return;
        
        const joinLeagueInterface: JoinLeagueInterface = {
           code: result,
           userId: user.id!
        };
        if (result != undefined) {
          this.isLoading = true;
          this.leagueService.joinLeague(joinLeagueInterface).subscribe(
            result => {
              if (result.message != undefined) {
                // tout est ok, on récupère les ligues
                this.leagueService.getMyLeagues(user.id!).subscribe(
                  leagues => {
                    if (leagues) {
                      this.commonService.sendUpdate(leagues);
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
