import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { LeaguesInterface } from '../interfaces/leagues.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {

  baseUrl: string = 'http://mpb-api.timothe-bequet.fr';
  public leagues$: BehaviorSubject<LeaguesInterface[] | null> = new BehaviorSubject<LeaguesInterface[] | null>(null);

  constructor(private http: HttpClient) { }

  getMyLeagues(id: number): Observable<LeaguesInterface[] | undefined> {    
    let queryParams = new HttpParams().append('id', id);
    return this.http.get<LeaguesInterface[]>(`${this.baseUrl}/myLeagues.php`, {params: queryParams}).pipe(
      catchError(this.handleError),
      map((result: any) => {
        console.log('mckqmkq', result['data']);
        if (result['data']
         && result['data'].length > 0
         && result['data'][0]['id']
         && result['data'][0]['id'] > 0
        ) {
          let leagues: LeaguesInterface[] = new Array<LeaguesInterface>;
          for (let i = 0; i < result['data'].length; i++) {
            leagues.push(
              <LeaguesInterface>{id: result['data'][i]['id'], 
                                    code: result['data'][i]['code'], 
                                    id_owner: result['data'][i]['id_owner'],
                                    name: result['data'][i]['name'],
                                    pseudo_owner: result['data'][i]['pseudoOwner'],
                                    nb_players: result['data'][i]['nb_players'],
                                    nb_in_league: result['data'][i]['nb_in_league']}
            );
          }
          /*return <LeaguesInterface>{id: result['data'][0]['id'], 
                                    code: result['data'][0]['code'], 
                                    id_owner: result['data'][0]['id_owner'],
                                    name: result['data'][0]['name'],
                                    pseudo_owner: result['data'][0]['pseudoOwner'],
                                    nb_players: result['data'][0]['nb_players'],
                                    nb_in_league: result['data'][0]['nb_in_league']};*/
          return leagues;
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
      console.error(`Le backend a retourné une erreur ${error.status} : `, error);
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

  joinLeague(code: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/joinLeague.php`, code).pipe(
      catchError(this.handleError),
      map((response: any) => {
        return response['data'];
      })
    );
  }
}
