import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { routes } from 'src/app/consts';
import { UserInfo } from 'src/app/store/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: UserInfo;

  @Output() signOut: EventEmitter<void> = new EventEmitter();

  routes = routes;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOutUser() {
    this.signOut.emit();
  }

  // No longer required; using routerLink instead
  /* navigate(url: string) {
    console.log(url);
    this.router.navigate([url]);
  } */

}
