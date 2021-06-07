import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Stat } from '../model/loginResult';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storageService: StorageService) { }

  authUser(user: User): Stat {
    let userArray: User[] = [];
    if (this.storageService.usersExist()) {
      userArray = this.storageService.getUsers();
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
      this.storageService.addUser(user);
      return Stat.REGISTERED;
    }

  }

  isLoggedIn() {
    return this.storageService.isLoggedIn();
  }

  loginUser(user: User) {
    this.storageService.setCurrentUser(user);
  }

  logOutUser() {
    this.storageService.removeCurrentUser();
  }

}


