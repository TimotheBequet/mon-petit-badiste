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
  link: string = "/home";
  public frmCreateLeague: FormGroup = this.createLeagueForm();
  matcher = new MyErrorStateMatcher();
  selected = "4";
  caption: string = 'Créer la ligue';
  submit: string = 'submit';
  userId?: number = 0;
  @ViewChild('name') inputName!: ElementRef;

  constructor(private leagueService: LeaguesService, 
    private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) {
    this.userId = this.userService.getUser().id;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {this.inputName.nativeElement.focus();});
  }

  onSubmit(): void {
    const league: LeaguesInterface = {
      id: undefined,
      name: this.frmCreateLeague.value.name,
      idOwner: Number(this.userId),
      nbPlayers: Number(this.selected),
      code: undefined,
      pseudoOwner: undefined,
      nbInLeague: 0,
      budget: 6000
    };
    this.leagueService.createLeague(league).subscribe(
      league => {
        if ((league.id !== undefined)) {
          this.router.navigate(['/home']);
        }
    });
  }

  createLeagueForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.minLength(4), Validators.required])],
    });
  }
}
