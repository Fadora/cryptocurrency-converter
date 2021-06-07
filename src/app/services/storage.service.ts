import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getUsers() {
    return JSON.parse((localStorage.getItem('Users')) as string);
  }

  usersExist() {
    if (localStorage.getItem('Users') === null)
      return false;
    else
      return true;
  }

  addUser(user: User) {
    let users: User[];
    if (this.usersExist()) {
      users = this.getUsers();
      users = [...users];
      users.push(user);
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
    this.setUpUserWithCrypto(user, "");
  }

  setUpUserWithCrypto(user: User, currency: string) {
    if (localStorage.getItem(user.username) === null) {
      localStorage.setItem(user.username, currency);
    }
    else {
      let cryptoList: string = JSON.parse((localStorage.getItem(user.username)) as string);
      cryptoList = cryptoList.concat(" " + currency);
      localStorage.setItem(user.username, cryptoList);
    }
  }

  setCurrentUser(user: User) {
    localStorage.setItem('currentUser', user.username);
  }

  removeCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser');
  }
}
