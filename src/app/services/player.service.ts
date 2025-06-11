import { Injectable } from '@angular/core';
import { PlayerInterface } from '../interfaces/player.interface';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { globalProperties } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  public players$: BehaviorSubject<PlayerInterface[] | null> = new BehaviorSubject<PlayerInterface[] | null>(null);

  constructor(private http: HttpClient) { }

  getMyPlayers(idUser: number, idLeague: number): Observable<PlayerInterface[] | undefined> {
    //return of(undefined);
    const queryBody= {'idUser': idUser, 'idLeague':idLeague};
    return this.http.post<PlayerInterface[]>(`${globalProperties.baseUrl}/leagues/team`, queryBody).pipe(
      catchError(this.handleError),
      map((result: any) => {
        return result;
      })
    );
  }

  getAllPlayers(): Observable<PlayerInterface[] | undefined> {
    return this.http.get<PlayerInterface[]>(`${globalProperties.baseUrl}/data/getalljoueurs`).pipe(
      catchError(this.handleError),
      map((result: any) => {
        return result;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      console.error('Une erreur est survenue : ', error.error.message);
    } else {
      console.error(`Le backend a retourné une erreur ${error.status} : `, error.error);
    }
    return throwError(() => new Error('Quelque chose s\'est mal passé, essayez plus tard'));
  }
}
