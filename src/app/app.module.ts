import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonMoveComponent } from './components/button-move/button-move.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConnexionPageComponent } from './components/connexion-page/connexion-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonRetourComponent } from './components/button-retour/button-retour.component';
import { CreateLeagueComponent } from './components/create-league/create-league.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ButtonMoveComponent,
    RegisterPageComponent,
    ConnexionPageComponent,
    MainPageComponent,
    ButtonRetourComponent,
    CreateLeagueComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        MatSnackBarModule,
        MatIconModule
    ],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
