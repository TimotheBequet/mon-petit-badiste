import { Component } from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../custom-validator";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private fb: FormBuilder) {}
  /*registerForm = this.fb.group({
    pseudo: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });*/
  public frmSignup: FormGroup = this.createSignupForm();

  // , Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$")
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
        CustomValidator.patternValidator(/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, { hasSpecialCharacters: true }),
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
