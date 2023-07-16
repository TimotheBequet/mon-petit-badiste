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
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.scss']
})
export class ConnexionPageComponent {

  caption: string = 'Se connecter';
  submit: string = 'submit';
  constructor(private fb: FormBuilder) {}
  public frmSignup: FormGroup = this.createSignupForm();
  matcher = new MyErrorStateMatcher();

  onSubmit(): void {
    console.warn(this.frmSignup.value);
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      pseudo: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required,])],
    });
  }
}
