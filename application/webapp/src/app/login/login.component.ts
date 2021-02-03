import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl();
    password = new FormControl();
    errMessage: string = '';
    submitMessage;

    formDetails: FormGroup;

    constructor(private authService: AuthenticationService, private routerService: RouterService){

    }

    ngOnInit() {
      this.formDetails = new FormGroup({
        username: this.username,
        password: this.password
      })
    }

    get UserName(){
      return this.formDetails.get('username');
    }

    get Password(){
      return this.formDetails.get('password');
    }

    loginSubmit() {
      let currentUser = this.formDetails.value;
      this.authService.authenticateUser(currentUser).subscribe(data => {
        this.authService.setBearerToken(data.token);
        this.routerService.routeToDashboard();
      },error => {
        this.submitMessage=' ';
        if(error.status === 404){
          this.errMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
        }else{
          this.errMessage = 'Unauthorized';
        }
      });
    }
}
