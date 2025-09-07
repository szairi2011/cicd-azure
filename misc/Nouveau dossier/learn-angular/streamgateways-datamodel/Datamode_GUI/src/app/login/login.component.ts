import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMessage = 'Invalid Login';
  invalidLogin = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.username ==='Akash', this.password ==='123') {
      this.router.navigate(['/datamodel']);
    }
    else{
      this.invalidLogin = true;
      console.log(this.invalidLogin);
    }

}
}
