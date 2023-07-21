import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {CustomValidator} from "../../custom-validator";
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
export class ConnexionPageComponent implements AfterViewInit, AfterViewChecked {

  caption: string = 'Se connecter';
  submit: string = 'submit';
  public frmSignup: FormGroup = this.createSignupForm();
  matcher = new MyErrorStateMatcher();
  @ViewChild('pseudo') inputPseudo!: ElementRef;

  constructor(private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.inputPseudo.nativeElement.focus();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  onSubmit(): void {
    console.warn(this.frmSignup.value);
    this.userService.login();
    this.router.navigate(['/home']);
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      pseudo: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required,])],
    });
  }
}
