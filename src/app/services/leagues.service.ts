import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LeaguesInterface } from '../interfaces/leagues.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  baseUrl: string = 'http://mpb-api.timothe-bequet.fr';
  public leagues$: BehaviorSubject<LeaguesInterface | null> = new BehaviorSubject<LeaguesInterface | null>(null);

  constructor(private http: HttpClient) { }

  getMyLeagues(id: number): Observable<LeaguesInterface | undefined> {
    let queryParams = new HttpParams().append('id', id);
    return this.http.get<LeaguesInterface>(`${this.baseUrl}/myLeagues.php`, {params: queryParams}).pipe(
      catchError(this.handleError),
      map((result: any) => {
        if (result['data']
         && result['data'].length > 0
         && result['data'][0]['id']
         && result['data'][0]['id'] > 0
        ) {
          return <LeaguesInterface>{id: result['data'][0]['id'], 
                                    code: result['data'][0]['code'], 
                                    id_owner: result['data'][0]['id_owner'],
                                    name: result['data'][0]['name'],
                                    pseudoOwner: result['data'][0]['pseudoOwner']};
        } else {
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

  createLeague(league: LeaguesInterface): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createLeague.php`, league).pipe(
      catchError(this.handleError),
      map((response: any) => {
        return response['data'];
      })
    );
  }
}
