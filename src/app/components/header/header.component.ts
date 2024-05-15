import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;
  userName: string = '';
  user!: UserInterface;
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = this.userService.getUser();
      this.isUserLogged = this.userService.isUserLogged();
      this.userName = this.userService.getUserName();
    });
  }
}
