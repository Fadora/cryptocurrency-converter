import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stat } from '../model/loginResult';
import { Router } from '@angular/router';
import { User } from '../model/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm!: FormGroup;
  user: User = { username: "", password: "" };

  constructor(
    private authService: AuthService,
    private sb: MatSnackBar,
    public router: Router) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onLogin() {
    let loginStat = this.authService.authUser(this.userData());
    
    switch (loginStat) {
        case Stat.LOGINSUCCESS:
            this.authService.loginUser(this.userData());
            this.router.navigate(['/user/'+this.getCurrrentUser()]);
            this.sb.open("Login successful!", "", { duration: 1500 });
            break;

        case Stat.LOGINFAILED:
            this.sb.open("Wrong password!", "", { duration: 1500 });
            break;

        case Stat.REGISTERED:
            this.authService.loginUser(this.userData());
            this.router.navigate(['/user/'+this.getCurrrentUser()]);
            this.sb.open("Registration successful!", "", { duration: 1500 });
            break;
        default:
          break;
    }
  }

  userData(): User {
    return this.user = {
      username: (this.loginForm.get('username') as FormControl).value,
      password: (this.loginForm.get('password') as FormControl).value
    }
  }

  getCurrrentUser(){
    return this.authService.isLoggedIn();
  }


}
