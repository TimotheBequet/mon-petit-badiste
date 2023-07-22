import { AfterViewInit, Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  isUserLogged: boolean = false;
  constructor(private userService: UserService){}
  ngAfterViewInit(): void {
    this.userService.userLogged$.subscribe(userLogged => this.isUserLogged = userLogged);
  }

  logout(): void {
    this.userService.logout();
  }
}
