import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    class: 'div-all-screen'
  }
})
export class HomeComponent implements OnInit {
  connexion = 'Connexion';
  inscription = 'Inscription';
  userLogged: boolean = false;
  
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(_ => this.userLogged = this.userService.isUserLogged());
  }
}
