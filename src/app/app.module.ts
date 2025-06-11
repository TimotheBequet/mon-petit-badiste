import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonMoveComponent } from './components/button-move/button-move.component';
import { ButtonRetourComponent } from './components/button-retour/button-retour.component';
import { LeagueCardComponent } from './components/league-card/league-card.component';
import { PopupJoinLeagueComponent } from './components/popup-join-league/popup-join-league.component';
import { MenuUserComponent } from './components/menu-user/menu-user.component';
import { MyTeamComponent } from './components/my-team/my-team.component';
import { ListPlayersComponent } from './components/list-players/list-players.component';
import { ButtonBuyComponent } from './components/button-buy/button-buy.component';
import { FilterComponent } from './components/filter/filter.component';
import { LoaderComponent } from './components/loader/loader.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ConnexionPageComponent } from './pages/connexion-page/connexion-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';
import { LeaguePageComponent } from './pages/league-page/league-page.component';

@NgModule({
  declarations: [
    AppComponent,
    // Pages
    HomeComponent,
    RegisterPageComponent,
    ConnexionPageComponent,
    MainPageComponent,
    CreateLeagueComponent,
    LeaguePageComponent,
    // Components
    HeaderComponent,
    FooterComponent,
    ButtonMoveComponent,
    ButtonRetourComponent,
    LeagueCardComponent,
    PopupJoinLeagueComponent,
    MenuUserComponent,
    MyTeamComponent,
    ListPlayersComponent,
    ButtonBuyComponent,
    FilterComponent,
    LoaderComponent
  ],
  imports: [
    // Core Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    
    // Forms
    ReactiveFormsModule,
    FormsModule,
    
    // Material Design Modules
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
