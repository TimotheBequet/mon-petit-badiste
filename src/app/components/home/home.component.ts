import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, AfterViewChecked {
  connexion = 'Connexion';
  inscription = 'Inscription';

  userLogged: boolean = false;
  
  constructor(private userService: UserService, private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.userService.userLogged$.subscribe(isLogged => this.userLogged = isLogged);
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
