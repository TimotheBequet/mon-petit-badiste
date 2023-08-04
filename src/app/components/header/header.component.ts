import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean = false;
  userName: string = '';
  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.isUserLogged = this.userService.isUserLogged();
      this.userName = this.userService.getUserName();
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/', 'home']);
  }
}
