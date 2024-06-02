import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { LeaguesInterface } from '../interfaces/leagues.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { JoinLeagueInterface } from '../interfaces/joinLeague.interface';
import { ClassementInterface } from '../interfaces/classement.interface';

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
          return leagues;
        } else {
          return undefined;
        }
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

  createLeague(league: LeaguesInterface): Observable<any> {
    console.log(league);
    return this.http.post<any>(`${this.baseUrl}/createLeague.php`, league).pipe(
      catchError(this.handleError),
      map((response: any) => {
        return response['data'];
      })
    );
  }

  joinLeague(joinLeague: JoinLeagueInterface): Observable<any> {
    const test = JSON.stringify(joinLeague);
    return this.http.post<any>(`${this.baseUrl}/joinLeague.php`, test).pipe(
      catchError(this.handleError),
      map((response: any) => {
        console.log('RESPONSEEE : ', response);
        return response['data'];
      })
    );
  }

  getClassementLeague(idLeague: number): Observable<ClassementInterface[] | undefined> {
    let queryParams = new HttpParams().append('id', idLeague);
    return this.http.get<ClassementInterface[]>(`${this.baseUrl}/classement.php`, {params: queryParams}).pipe(
      catchError(this.handleError),
      map((result: any) => {
        if (result['data']
            && result['data'].length > 0
            && result['data'][0]['pseudo']
        ) {
          let classement: ClassementInterface[] = new Array<ClassementInterface>;
          for (let i = 0; i < result['data'].length; i++) {
            classement.push(
              <ClassementInterface>{
                classement: i+1,
                pseudo: result['data'][i]['pseudo'],
                score: result['data'][i]['score']
              }
            );
          } 
          return classement;
        } else {
          return undefined;
        }
      })
    );
  }
}
