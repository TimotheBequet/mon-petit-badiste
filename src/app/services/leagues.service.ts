import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LeaguesInterface } from '../interfaces/leagues.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JoinLeagueInterface } from '../interfaces/joinLeague.interface';
import { ClassementInterface } from '../interfaces/classement.interface';
import { globalProperties } from '../environments/environment';
import { CompoTempInterface } from '../interfaces/compo-temp.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {
  public leagues$: BehaviorSubject<LeaguesInterface[] | null> = new BehaviorSubject<LeaguesInterface[] | null>(null);

  constructor(private http: HttpClient) { }

  getMyLeagues(id: number): Observable<LeaguesInterface[] | undefined> {    
    let queryBody = {'id':id};
    return this.http.post<LeaguesInterface[]>(`${globalProperties.baseUrl}/leagues/myleagues`, queryBody).pipe(
      catchError(this.handleError),
      map((result: any) => {
        if (result
         && result.length > 0
         && result[0]['id']
         && result[0]['id'] > 0
        ) {
          let leagues: LeaguesInterface[] = new Array<LeaguesInterface>;
          for (let i = 0; i < result.length; i++) {
            leagues.push(
              <LeaguesInterface>{id: result[i]['id'], 
                                    code: result[i]['code'], 
                                    idOwner: result[i]['idOwner'],
                                    name: result[i]['name'],
                                    pseudoOwner: result[i]['pseudoOwner'],
                                    nbPlayers: result[i]['nbPlayers'],
                                    nbInLeague: result[i]['nbInLeague'],
                                    budget: result[i]['budget']}
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
    return this.http.post<any>(`${globalProperties.baseUrl}/leagues/create`, league).pipe(
      catchError(this.handleError),
      map((response: any) => {
        return response;
      })
    );
  }

  joinLeague(joinLeague: JoinLeagueInterface): Observable<any> {
    return this.http.post<any>(`${globalProperties.baseUrl}/leagues/join`, joinLeague).pipe(
      catchError(this.handleError),
      map((response: any) => {
        return response;
      })
    );
  }

  getClassementLeague(idLeague: number): Observable<ClassementInterface[] | undefined> {
    const queryBody= {'id':idLeague};
    return this.http.post<ClassementInterface[]>(`${globalProperties.baseUrl}/leagues/classement`, queryBody).pipe(
      catchError(this.handleError),
      map((result: any) => {
        if (result
            && result.length > 0
            && result[0]['pseudo']
        ) {
          let classement: ClassementInterface[] = new Array<ClassementInterface>;
          for (let i = 0; i < result.length; i++) {
            classement.push(
              <ClassementInterface>{
                classement: i+1,
                pseudo: result[i]['pseudo'],
                score: result[i]['score']
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

  setCompoTemp(compo: CompoTempInterface[]): Observable<CompoTempInterface[] | undefined> {
    const body = {'playersTemp': compo};
    return this.http.post<CompoTempInterface[]>(`${globalProperties.baseUrl}/leagues/setcompotemp`, body).pipe(
      catchError(this.handleError),
      map((result: any) => {
        if (result && result.length > 0) {
          // revoir ça : result contient le résultat de l'insertion
          let compoTemp: CompoTempInterface[] = new Array<CompoTempInterface>;
          for (let c of result) {
            compoTemp.push(
              <CompoTempInterface>{
                idUser: c.idUser,
                idLeague: c.idLeague,
                idPlayer: c.idPlayer,
                prixPlayer: c.prixPlayer,
                datePurchase: c.datePurchase
              }
            );
          }
          return compoTemp;
        } else {
          return undefined;
        }
      })
    )
  }
}
