import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  styleUrls: ['./connexion-page.component.scss']
})
export class ConnexionPageComponent implements AfterViewInit {

  durationInSeconds: number = 5;
  caption: string = 'Se connecter';
  submit: string = 'submit';
  public frmSignup: FormGroup = this.createSignupForm();
  matcher = new MyErrorStateMatcher();
  @ViewChild('pseudo') inputPseudo!: ElementRef;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private _snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    setTimeout(() => {this.inputPseudo.nativeElement.focus();});
  }

  onSubmit(): void {
    // on appelle laméthode login() et on souscrit à son retour dès qu'elle nous renvoie quelque chose
    this.userService.login(this.frmSignup.value.pseudo, this.frmSignup.value.password).subscribe(
      user => {
        // si on a bien récupéré un User et qu'on a bien son Id
        if ((user !== undefined) && (user.id !== undefined)) {
          // on renseigne le user
          this.userService.user$.next(user);
          // on est redirigés vers la page Home
          this.router.navigate(['/home']);
        } else {
          console.log('erreur');
          this._snackBar.open('Pseudo ou mot de passe incorrect.', 'Fermer', {
            duration: this.durationInSeconds*1000,
            verticalPosition: 'top'
          });
        }
      }
    );
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      pseudo: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required,])],
    });
  }
}