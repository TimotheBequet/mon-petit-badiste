import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject, takeUntil, finalize } from 'rxjs';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';
import { PopupJoinLeagueComponent } from 'src/app/components/popup-join-league/popup-join-league.component';
import { JoinLeagueInterface } from 'src/app/interfaces/joinLeague.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  host: {
    class: 'div-all-screen'
  }
})
export class MainPageComponent implements OnInit, OnDestroy {
  // Constantes
  private static readonly DIALOG_WIDTH = '350px';
  private static readonly SNACKBAR_DURATION = 5000;

  // Propriétés publiques
  readonly emojiSmirkingFace = '&#128527;';
  readonly emojiEyesStars = '&#129321;';
  
  myLeagues: LeaguesInterface[] = [];
  isLoading = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly leagueService: LeaguesService,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMyLeagues();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupJoinLeagueComponent, {
      width: MainPageComponent.DIALOG_WIDTH,
      data: { code: '' }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.joinLeague(result);
        }
      });
  }

  private loadMyLeagues(): void {
    const currentUser = this.userService.getUser();
    if (!currentUser?.id) {
      console.error('Utilisateur non connecté');
      return;
    }

    this.isLoading = true;
    this.leagueService.getMyLeagues(currentUser.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (leagues) => {
          this.myLeagues = leagues || [];
        },
        error: (error) => {
          console.error('Erreur lors du chargement des ligues:', error);
          this.showErrorMessage('Impossible de charger vos ligues');
        }
      });
  }

  private joinLeague(code: string): void {
    const currentUser = this.userService.getUser();
    if (!currentUser?.id) {
      console.error('Utilisateur non connecté');
      return;
    }

    const joinLeagueData: JoinLeagueInterface = {
      code,
      userId: currentUser.id
    };

    this.isLoading = true;
    this.leagueService.joinLeague(joinLeagueData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (result) => {
          if (result.message) {
            this.loadMyLeagues(); // Recharger les ligues après avoir rejoint une nouvelle
            this.showSuccessMessage('Vous avez rejoint la ligue avec succès !');
          } else if (result.error) {
            this.showErrorMessage(result.error);
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'adhésion à la ligue:', error);
          this.showErrorMessage('Impossible de rejoindre la ligue');
        }
      });
  }

  private showSuccessMessage(message: string): void {
    const config: MatSnackBarConfig = {
      panelClass: ['success'],
      verticalPosition: 'bottom',
      duration: MainPageComponent.SNACKBAR_DURATION
    };
    this.snackBar.open(message, 'Fermer', config);
  }

  private showErrorMessage(message: string): void {
    const config: MatSnackBarConfig = {
      panelClass: ['error'],
      verticalPosition: 'bottom',
      duration: MainPageComponent.SNACKBAR_DURATION
    };
    this.snackBar.open(message, 'Fermer', config);
  }
}
