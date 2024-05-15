import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent {
  @Input('user') user: UserInterface = {} as UserInterface;
  @Input('isUserLogged') isUserLogged: Boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'home']);
  }

  goToLeagues(): void {
    this.router.navigate(['/', 'home']);
  }
}
