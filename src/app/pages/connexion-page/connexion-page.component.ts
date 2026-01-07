import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
    selector: 'app-connexion-page',
    templateUrl: './connexion-page.component.html',
    styleUrls: ['./connexion-page.component.scss'],
    host: {
        class: 'div-all-screen'
    },
    standalone: false
})
export class ConnexionPageComponent implements AfterViewInit {

  durationInSeconds: number = 5;
  caption: string = 'Se connecter';
  submit: string = 'submit';
  public frmSignup: FormGroup = this.createSignupForm();
  matcher = new MyErrorStateMatcher();
  @ViewChild('email') inputEmail!: ElementRef;
  link: string = "/home";

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private _snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    setTimeout(() => {this.inputEmail.nativeElement.focus();});
  }

  onSubmit(): void {
    // on appelle laméthode login() et on souscrit à son retour dès qu'elle nous renvoie quelque chose
    this.userService.login(this.frmSignup.value.email.toLowerCase(), this.frmSignup.value.password).subscribe(
      user => {
        // si on a bien récupéré un User et qu'on a bien son Id
        if ((user !== undefined) && (user.id !== undefined)) {
          // on renseigne le user
          this.userService.user$.next(user);
          // on est redirigés vers la page Home
          this.router.navigate(['/home']);
        } else {
          const config = new MatSnackBarConfig();
            config.panelClass = ['error'];
            config.verticalPosition = 'top';
            config.duration = this.durationInSeconds*1000;
          this._snackBar.open('Email ou mot de passe incorrect.', 'Fermer', config);
        }
      }
    );
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      email: [null, Validators.compose([Validators.email, Validators.required])],
      password: [null, Validators.compose([Validators.required,])],
    });
  }
}