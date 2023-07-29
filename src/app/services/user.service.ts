import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:8090/mpb-api';
  public user$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  constructor(private http: HttpClient) { }

  register(user: UserInterface): Observable<any> {
    // on fait un post avec le User passé en paramètre, 
    return this.http.post<any>(`${this.baseUrl}/register`, user).pipe(
      // on tente de traiter les erreurs s'il y en a
      catchError(this.handleError),
      // si pas d'erreur, on traite le retour de la requête
      map((response: any) => {
        return response['data'];
      })
    );
  }

  login(pseudo: string, pwd: string): Observable<UserInterface | undefined> {
    // parametres du GET pour vérifier le couple pseudo/mot de passe
    let queryParams = new HttpParams();
    queryParams = queryParams.append('pseudo', pseudo);
    queryParams = queryParams.append('pwd', pwd);
    // on fait la requête, qui devrait nous retourner un UserInterface si tout se passe bien
    return this.http.get<UserInterface>(`${this.baseUrl}/login`, {params: queryParams}).pipe(
      // on tente d'abord d'attraper les éventuelles erreurs
      catchError(this.handleError),
      // si on arrive ici, pas d'erreur, on traite le retour de la requête
      map((result: any) => {
        // si on a bien récupéré un id, c'est que la requête est OK
        if (result 
          && result['data'] 
          && result['data'].length > 0
          && result['data'][0]['id'] 
          && result['data'][0]['id'] > 0) {
          // on retourne donc un UserInterface
          const user: UserInterface = <UserInterface>{id: result['data'][0]['id'], pseudo: result['data'][0]['pseudo'], email: result['data'][0]['email']};
          localStorage.setItem('user', JSON.stringify(user));
          return user;
        } else {
          // sinon on retourne rien
          localStorage.removeItem('user');
          return undefined;
        }
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Une erreur est survenue : ', error.error);
    } else {
      console.error(`Le backend a retourné une erreur ${error.status} : `, error.error);
    }
    return throwError(() => new Error('Quelque chose s\'est mal passé, essayez plus tard'));
  }

  logout() : void {
    //this.userLogged$.next(false);
    localStorage.removeItem('user');
    this.user$.next(null);
  }

  setUser(oneUser: UserInterface) {
    this.user$.next(oneUser);
  }

  isUserLogged(): boolean {
    if (localStorage.getItem('user') === null)
      return false;
    else
      return localStorage.getItem('user') !== '' ? true : false;
  }

  getUserName(): string {
    if (localStorage.getItem('user') === null) {
      return '';
    } else {
      const user: UserInterface = JSON.parse(localStorage.getItem('user')!);
      return user.pseudo;
    }
  }

  getUser(): UserInterface {
    const user: UserInterface = JSON.parse(localStorage.getItem('user')!);
    return user;
  }
}
