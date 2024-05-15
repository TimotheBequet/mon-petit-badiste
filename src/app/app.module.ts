import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonMoveComponent } from './components/button-move/button-move.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConnexionPageComponent } from './pages/connexion-page/connexion-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ButtonRetourComponent } from './components/button-retour/button-retour.component';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';
import { MatSelectModule } from '@angular/material/select';
import { LeagueCardComponent } from './components/league-card/league-card.component'
import {MatTooltipModule} from '@angular/material/tooltip';
import { PopupJoinLeagueComponent } from './components/popup-join-league/popup-join-league.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { LeaguePageComponent } from './pages/league-page/league-page.component';
import { MenuUserComponent } from './components/menu-user/menu-user.component';

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
    CreateLeagueComponent,
    LeagueCardComponent,
    PopupJoinLeagueComponent,
    LeaguePageComponent,
    MenuUserComponent
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
        MatIconModule,
        MatSelectModule,
        MatTooltipModule,
        MatDialogModule,
        FormsModule
    ],
  providers: [MatSnackBarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
