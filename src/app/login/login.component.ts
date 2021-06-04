import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user: User = { username: "", password: "" };
  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onLogin() {
    console.log(this.loginForm)
    this.authService.authUser(this.userData());
  }

  userData(): User {
    return this.user = {
      username: (this.loginForm.get('username') as FormControl).value,
      password: (this.loginForm.get('password') as FormControl).value
    }
  }


}
