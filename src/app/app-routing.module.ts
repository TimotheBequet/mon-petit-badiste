import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { ConnexionPageComponent } from './pages/connexion-page/connexion-page.component';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';
import { LeaguePageComponent } from './pages/league-page/league-page.component';

const routes: Routes = [
  {path: 'register', component: RegisterPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'connexion', component: ConnexionPageComponent},
  {path: 'create-league', component: CreateLeagueComponent},
  {path: 'league', component: LeaguePageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
