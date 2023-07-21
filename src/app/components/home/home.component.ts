import { AfterViewInit, Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  connexion = 'Connexion';
  inscription = 'Inscription';

  userLogged: boolean = false;
  
  constructor(private userService: UserService) {
  }

  ngAfterViewInit(): void {
    this.userService.userLogged.subscribe(isLogged => this.userLogged = isLogged);
  }
}
