import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
  constructor() {}

  // Get all localstorage items
  getItems() {
    const backups = [];

    for (let i = 0; i < localStorage.length; i++) {
      backups.push(localStorage.key(i));
    }

    return backups;
  }

  // get specific localstorage item
  getItem(name) {
    const value = localStorage.getItem(name);
    return value;
  }

  // set localstorage item // Get key : value
  setItem(name, value) {
    localStorage.setItem(name, value);
  }

  // clear localstorage
  clear() {
    localStorage.clear();
  }

  // delete item in localstorage
  deleteItem(name: string, callback) {
    localStorage.removeItem(name);
    callback();
  }
}
