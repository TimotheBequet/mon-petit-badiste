import { Component, Input } from '@angular/core';
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
}
