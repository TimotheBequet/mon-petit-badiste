import { Component, OnDestroy } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CustomValidator } from '../../custom-validator';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Classe pour gérer les erreurs dans les inputs
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
export class RegisterPageComponent implements OnDestroy {
  // Constantes
  private static readonly SUCCESS_MESSAGE = 'Inscription réussie ! Maintenant, connectes-toi.';
  private static readonly ERROR_MESSAGE = 'Une erreur est survenue lors de l\'inscription.';
  private static readonly SNACKBAR_DURATION = 5000;

  // Propriétés publiques
  readonly caption = 'S\'inscrire';
  readonly submit = 'submit';
  readonly link = '/home';
  readonly matcher = new MyErrorStateMatcher();

  frmSignup: FormGroup;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.frmSignup = this.createSignupForm();
  }

  onSubmit(): void {
    if (this.frmSignup.invalid) {
      this.frmSignup.markAllAsTouched();
      return;
    }

    const user: UserInterface = {
      pseudo: this.frmSignup.value.pseudo,
      email: this.frmSignup.value.email,
      password: this.frmSignup.value.password
    };

    this.userService.register(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/connexion']);
            this.showSuccessMessage();
          } else {
            this.showErrorMessage();
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription:', error);
          this.showErrorMessage(error.message);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createSignupForm(): FormGroup {
    return this.fb.group({
      pseudo: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-Z0-9_-]+$/) // Caractères alphanumériques uniquement
        ]
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidator.patternValidator(/[!.*+?^${}()|[\]\\]/, { hasSpecialCharacters: true })
        ]
      ],
      confirmPassword: [
        null,
        [Validators.required]
      ]
    }, {
      validators: CustomValidator.passwordMatchValidator
    } as AbstractControlOptions);
  }

  private showSuccessMessage(): void {
    const config: MatSnackBarConfig = {
      panelClass: ['success'],
      verticalPosition: 'bottom',
      duration: RegisterPageComponent.SNACKBAR_DURATION
    };
    this.snackBar.open(RegisterPageComponent.SUCCESS_MESSAGE, 'Fermer', config);
  }

  private showErrorMessage(customMessage?: string): void {
    const config: MatSnackBarConfig = {
      panelClass: ['error'],
      verticalPosition: 'top',
      duration: RegisterPageComponent.SNACKBAR_DURATION
    };
    const message = customMessage || RegisterPageComponent.ERROR_MESSAGE;
    this.snackBar.open(message, 'Fermer', config);
  }
}
