import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  isLogging = false;

  loginForm = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  };

  get fieldValues() {
    return {
        email: this.loginForm.email.value,
        password: this.loginForm.password.value
    }
  }
  
  serverMessage = "";

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.isLogging = true;
    this.serverMessage = "";

    this.authService.login(this.fieldValues)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(err => this.serverMessage = err.message)
      .finally(() => {
        this.isLogging = false;
      })
  }



  register() {
    this.authService.register(this.fieldValues)
      .then(() => {})
      .catch(err => console.log);
  }

}
