import { Component } from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {CustomValidator} from "../../custom-validator";
import {ErrorStateMatcher} from '@angular/material/core';

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
})

export class RegisterPageComponent {

  caption: string = 'S\'inscrire';
  submit: string = 'submit';
  constructor(private fb: FormBuilder) {}
  public frmSignup: FormGroup = this.createSignupForm();
  matcher = new MyErrorStateMatcher();

  onSubmit(): void {
    console.warn(this.frmSignup.value);
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      pseudo: [null, Validators.compose([Validators.minLength(4), Validators.required])],
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
