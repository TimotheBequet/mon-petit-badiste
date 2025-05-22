import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLogged: boolean = false;
  userName: string = '';
  user: UserInterface | null = null;
  private readonly destroy$ = new Subject<void>();
  maxNavHeight: number = 112;
  minNavHeight: number = 50;
  navHeight: number = this.maxNavHeight;
  scrollStart: number = 0;
  scrollEnd: number = 200;
  maxFontSize: number = 48;
  minFontSize: number = 21;
  fontSize: number = this.maxFontSize;
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        this.isUserLogged = this.userService.isUserLogged();
        this.userName = this.userService.getUserName();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollY: number = window.scrollY || document.documentElement.scrollTop;
    if (scrollY <= this.scrollStart) {
      this.navHeight = this.maxNavHeight;
      this.fontSize = this.maxFontSize;
    } else if (scrollY >= this.scrollEnd) {
      this.navHeight = this.minNavHeight;
      this.fontSize = this.minFontSize;
    } else {
      const progress: number = (scrollY - this.scrollStart) / (this.scrollEnd - this.scrollStart);
      this.navHeight = this.maxNavHeight - progress * (this.maxNavHeight - this.minNavHeight);
      this.fontSize = this.navHeight * 0.428;
    }
  }
}
