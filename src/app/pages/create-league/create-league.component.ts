import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LeaguesInterface } from 'src/app/interfaces/leagues.interface';
import { LeaguesService } from 'src/app/services/leagues.service';
import { UserService } from 'src/app/services/user.service';

/**
 * classe pour gérer les erreurs dans les inputs
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
    selector: 'app-create-league',
    templateUrl: './create-league.component.html',
    styleUrls: ['./create-league.component.scss'],
    host: {
        class: 'div-all-screen'
    },
    standalone: false
})
export class CreateLeagueComponent implements AfterViewInit {
  link = '/home';
  frmCreateLeague!: FormGroup;
  matcher = new MyErrorStateMatcher();
  selected = '4';
  caption = 'Créer la ligue';
  submit = 'submit';
  userId!: number;
  @ViewChild('name') inputName!: ElementRef;

  constructor(
    private readonly leagueService: LeaguesService, 
    private readonly fb: FormBuilder, 
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    const currentUser = this.userService.getUser();
    if (!currentUser?.id) {
      this.router.navigate(['/connexion']);
      return;
    }
    this.userId = currentUser.id;
    this.frmCreateLeague = this.createLeagueForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.inputName.nativeElement.focus();
    });
  }

  onSubmit(): void {
    if (this.frmCreateLeague.invalid) {
      this.frmCreateLeague.markAllAsTouched();
      return;
    }

    const league: Partial<LeaguesInterface> = {
      name: this.frmCreateLeague.value.name,
      idOwner: this.userId,
      nbPlayers: Number(this.selected),
      nbInLeague: 0,
      budget: 6000
    };

    this.leagueService.createLeague(league as LeaguesInterface).subscribe({
      next: (createdLeague) => {
        if (createdLeague?.id) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la création de la ligue:', error);
      }
    });
  }

  private createLeagueForm(): FormGroup {
    return this.fb.group({
      name: [
        null, 
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ]
    });
  }
}
