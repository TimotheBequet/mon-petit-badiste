import { Component } from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {CustomValidator} from "../../custom-validator";
import {ErrorStateMatcher} from '@angular/material/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
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
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  host: {
    class: 'div-all-screen'
  }
})

export class RegisterPageComponent {

  caption: string = 'S\'inscrire';
  submit: string = 'submit';
  public frmSignup: FormGroup = this.createSignupForm();
  matcher = new MyErrorStateMatcher();
  link: string = "/home";
  durationInSeconds: number = 5;

  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar) {}

  onSubmit(): void {
    // on construit un User avec les infos du formulaire
    const user: UserInterface = {
      pseudo: this.frmSignup.value.pseudo,
      email: this.frmSignup.value.email,
      password: this.frmSignup.value.password
    };
    // on appelle la méthode register() avec le User en paramètre
    // et on souscrit à son retour pour passer à la suite dès que la fonction nous renvoie quelque chose
    this.userService.register(user).subscribe(retour => {
      // si le retour est un User, on affiche un message de succès
      if (retour) {
        this.router.navigate(['/connexion']);
        const config = new MatSnackBarConfig();
            config.panelClass = ['success'];
            config.verticalPosition = 'bottom';
            config.duration = this.durationInSeconds*1000;
        this._snackBar.open('Inscription réussie ! Maintenant, connectes-toi.', 'Fermer', config);
      }
      // sinon, on affiche un message d'erreur
      else {
        const config = new MatSnackBarConfig();
            config.panelClass = ['error'];
            config.verticalPosition = 'top';
            config.duration = this.durationInSeconds*1000;
        this._snackBar.open('Une erreur est survenue lors de l\'inscription.', 'Fermer', config);
      }
    });
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      pseudo: [null, Validators.compose([Validators.minLength(3), Validators.required])],
      email: [null, Validators.compose([Validators.email, Validators.required])],
      password: [null, Validators.compose([
        Validators.required,
        CustomValidator.patternValidator(/\d/, {hasNumber: true}),
        CustomValidator.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidator.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidator.patternValidator(/[!.*+?^${}()|[\]\\]/, {hasSpecialCharacters: true}),
        Validators.minLength(8)
      ])],
      confirmPassword: [null, Validators.compose([Validators.required])]
    },
      {
        validator: CustomValidator.passwordMatchValidator
      } as AbstractControlOptions
    );
  }
}
