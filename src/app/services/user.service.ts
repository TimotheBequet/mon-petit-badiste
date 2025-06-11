import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { globalProperties } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_STORAGE_KEY = 'user';
  private readonly userSubject = new BehaviorSubject<UserInterface | null>(this.getUserFromStorage());

  // Observable public pour les composants
  public readonly user$ = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  /**
   * Inscrit un nouvel utilisateur
   * @param user - Données de l'utilisateur à inscrire
   * @returns Observable du résultat de l'inscription
   */
  register(user: UserInterface): Observable<any> {
    return this.http.post<any>(`${globalProperties.baseUrl}/register`, user).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Connecte un utilisateur
   * @param email - Email de l'utilisateur
   * @param password - Mot de passe de l'utilisateur
   * @returns Observable contenant l'utilisateur connecté ou undefined
   */
  login(email: string, password: string): Observable<UserInterface | undefined> {
    const credentials = { email, password };
    
    return this.http.post<any>(`${globalProperties.baseUrl}/login`, credentials).pipe(
      catchError(this.handleError.bind(this)),
      map((response: any) => this.handleLoginResponse(response)),
      tap(user => {
        if (user) {
          this.setUserInStorage(user);
          this.userSubject.next(user);
        }
      })
    );
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    this.removeUserFromStorage();
    this.userSubject.next(null);
  }

  /**
   * Met à jour l'utilisateur courant
   * @param user - Nouvelles données utilisateur
   */
  setUser(user: UserInterface): void {
    this.setUserInStorage(user);
    this.userSubject.next(user);
  }

  /**
   * Vérifie si un utilisateur est connecté
   * @returns true si un utilisateur est connecté, false sinon
   */
  isUserLogged(): boolean {
    return this.getUserFromStorage() !== null;
  }

  /**
   * Récupère le nom d'utilisateur
   * @returns Le pseudo de l'utilisateur ou une chaîne vide
   */
  getUserName(): string {
    const user = this.getUserFromStorage();
    return user?.pseudo ?? '';
  }

  /**
   * Récupère l'ID de l'utilisateur
   * @returns L'ID de l'utilisateur ou undefined
   */
  getUserId(): number | undefined {
    const user = this.getUserFromStorage();
    return user?.id;
  }

  /**
   * Récupère l'utilisateur courant
   * @returns L'utilisateur courant ou null
   */
  getUser(): UserInterface | null {
    return this.getUserFromStorage();
  }

  /**
   * Gère les réponses de connexion
   * @param response - Réponse du serveur
   * @returns UserInterface ou undefined
   */
  private handleLoginResponse(response: any): UserInterface | undefined {
    if (response?.id && response.id > 0) {
      return {
        id: response.id,
        pseudo: response.pseudo,
        email: response.email,
        password: '' // Ne pas stocker le mot de passe
      };
    }
    return undefined;
  }

  /**
   * Gère les erreurs HTTP
   * @param error - Erreur HTTP
   * @returns Observable d'erreur
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur inattendue s\'est produite';

    if (error.status === 0) {
      console.error('Erreur de connexion:', error.error);
      errorMessage = 'Erreur de connexion au serveur';
    } else if (error.status === 401) {
      errorMessage = 'Identifiants incorrects';
    } else if (error.status === 409) {
      errorMessage = 'Un compte avec cet email existe déjà';
    } else {
      console.error(`Erreur ${error.status}:`, error.error);
      errorMessage = `Erreur du serveur (${error.status})`;
    }

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Récupère l'utilisateur depuis le localStorage
   * @returns UserInterface ou null
   */
  private getUserFromStorage(): UserInterface | null {
    try {
      const userString = localStorage.getItem(this.USER_STORAGE_KEY);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture du localStorage:', error);
      this.removeUserFromStorage();
      return null;
    }
  }

  /**
   * Sauvegarde l'utilisateur dans le localStorage
   * @param user - Utilisateur à sauvegarder
   */
  private setUserInStorage(user: UserInterface): void {
    try {
      localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  }

  /**
   * Supprime l'utilisateur du localStorage
   */
  private removeUserFromStorage(): void {
    localStorage.removeItem(this.USER_STORAGE_KEY);
  }
}
