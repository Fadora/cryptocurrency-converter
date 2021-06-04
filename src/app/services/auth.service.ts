import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  addUser(user: User) {
    let users: User[];
    if (localStorage.getItem('Users')) {
      users = JSON.parse((localStorage.getItem('Users')) as string);
      users = [...users];
      users.push(user);
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users))
  }

  authUser(user: User){
    let userArray: User[] = [];
    if (localStorage.getItem('Users')) {
      userArray = JSON.parse((localStorage.getItem('Users')) as string);
    }
    if (userArray.find(u => u.username === user.username)) {
      if (userArray.find(u => u.username === user.username && u.password === user.password)) {
          console.log("Login successful");
          //TODO: dialog message
      }
      else {
          console.log("Wrong password");
          //TODO: dialog message
      }
    }
    else {
      this.addUser(user);
      console.log("Registration successful");
      //TODO: dialog message
    }

  }

}
