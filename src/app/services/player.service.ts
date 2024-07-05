import { Injectable } from '@angular/core';
import { PlayerInterface } from '../interfaces/player.interface';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerServiceService {

  public players$: BehaviorSubject<PlayerInterface[] | null> = new BehaviorSubject<PlayerInterface[] | null>(null);

  constructor(private http: HttpClient) { }

  getMyPlayers(id: number) {
  }
}
