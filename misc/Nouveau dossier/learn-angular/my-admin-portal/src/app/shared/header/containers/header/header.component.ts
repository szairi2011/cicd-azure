import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/store/models';
import { routes } from './../../../../consts/routes';
import { Observable } from 'rxjs';
import { Email } from './../../../../pages/auth/models';
import { EmailService, AuthService } from './../../../../pages/auth/services';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from 'src/app/store';
import { selectLoggedInUserInfo } from 'src/app/store/selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isMenuOpened: boolean = true;

  @Output() toggleSidenav: EventEmitter<void> = new EventEmitter();

  emails$: Observable<Email[]>;

  user$: Observable<UserInfo>;

  routes = routes;

  app_title: String;

  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.emails$ = this.emailService.loadEmails();
    this.user$ = this.store.select(selectLoggedInUserInfo);
    this.app_title = environment.app_title;
  }

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
    this.toggleSidenav.emit();
  }

  signout() {
    this.authService.signout();
    this.router.navigate([this.routes.LOGIN_PAGE]);
  }

}
