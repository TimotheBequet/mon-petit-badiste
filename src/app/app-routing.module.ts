import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { ConnexionPageComponent } from './components/connexion-page/connexion-page.component';
import { CreateLeagueComponent } from './components/create-league/create-league.component';

const routes: Routes = [
  {path: 'register', component: RegisterPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'connexion', component: ConnexionPageComponent},
  {path: 'create-league', component: CreateLeagueComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
