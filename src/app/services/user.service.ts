import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators'
import { globalProperties } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);

  constructor(private http: HttpClient) { }

  register(user: UserInterface): Observable<any> {
    // on fait un post avec le User passé en paramètre, 
    return this.http.post<any>(`${globalProperties.baseUrl}/register`, user).pipe(
      // on tente de traiter les erreurs s'il y en a
      catchError(this.handleError),
      // si pas d'erreur, on traite le retour de la requête
      map((response: any) => {
        return response;
      })
    );
  }

  login(email: string, pwd: string): Observable<UserInterface | undefined> {
    // parametres du GET pour vérifier le couple pseudo/mot de passe
    let queryBody = {"email":email, "password":pwd};
    // on fait la requête, qui devrait nous retourner un UserInterface si tout se passe bien
    return this.http.post<UserInterface>(`${globalProperties.baseUrl}/login`, queryBody).pipe(
      // on tente d'abord d'attraper les éventuelles erreurs
      catchError(this.handleError),
      // si on arrive ici, pas d'erreur, on traite le retour de la requête
      map((result: any) => {
        console.log("RESULT : ", result);
        // si on a bien récupéré un id, c'est que la requête est OK
        if (result 
          && result['id'] 
          && result['id'] > 0) {
          // on retourne donc un UserInterface
          const user: UserInterface = <UserInterface>{id: result['id'], pseudo: result['pseudo'], email: result['email']};
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

  getUserId(): number | undefined {
    if (localStorage.getItem('user') === null) {
      return undefined;
    } else {
      const user: UserInterface = JSON.parse(localStorage.getItem('user')!);
      return user.id;
    }
  }

  getUser(): UserInterface {
    const user: UserInterface = JSON.parse(localStorage.getItem('user')!);
    return user;
  }
}
