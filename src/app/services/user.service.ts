import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  login(): void {
    this.userLogged.next(true);
  }

  logout() : void {
    this.userLogged.next(false);
  }
}
