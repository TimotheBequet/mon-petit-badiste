import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ConnexionPageComponent } from './pages/connexion-page/connexion-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreateLeagueComponent } from './pages/create-league/create-league.component';
import { LeaguePageComponent } from './pages/league-page/league-page.component';

// Guards
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Routes publiques
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'connexion', component: ConnexionPageComponent },

  // Routes protégées (nécessitent une authentification)
  { 
    path: 'dashboard', 
    component: MainPageComponent, 
    canActivate: [AuthGuard],
    data: { title: 'Tableau de bord' }
  },
  { 
    path: 'create-league', 
    component: CreateLeagueComponent, 
    canActivate: [AuthGuard],
    data: { title: 'Créer une ligue' }
  },
  { 
    path: 'league', 
    component: LeaguePageComponent, 
    canActivate: [AuthGuard],
    data: { title: 'Ma ligue' }
  },

  // Route de fallback pour les pages non trouvées
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Options du routeur pour améliorer les performances
    enableTracing: false, // Mettre à true pour le debugging
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
