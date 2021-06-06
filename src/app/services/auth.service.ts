import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Stat } from '../model/loginResult';
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

  

  authUser(user: User): Stat{
    let userArray: User[] = [];
    if (localStorage.getItem('Users')) {
      userArray = JSON.parse((localStorage.getItem('Users')) as string);
    }
    if (userArray.find(u => u.username === user.username)) {
      if (userArray.find(u => u.username === user.username && u.password === user.password)) {

          return Stat.LOGINSUCCESS;
      }
      else {
          return Stat.LOGINFAILED;
      }
    }
    else {
      this.addUser(user);
      return Stat.REGISTERED;
    }

  }

  isLoggedIn() {
    return localStorage.getItem('currentUser');
  }

  loginUser(user:User){
    localStorage.setItem('currentUser',user.username)
  }

  logOutUser() {
    localStorage.removeItem('currentUser');
  }

}


