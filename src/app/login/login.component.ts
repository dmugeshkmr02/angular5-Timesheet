import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import {FormControl, Validators, NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
    let email = this.email.value;
    let password = this.password.value;
    this.router.navigate(['/timesheet']);

    //alert('Username : ' + email + '<br/>' + 'Password : ' + password);
    /*if (email === 'admin@123' && password === 'admin'){
      this.router.navigate(['/timesheet']);
    }*/   
  }

  /*login() {
    this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
          },
          error => {
              this.alertService.error(error);
              this.loading = false;
    });
  }*/
}
