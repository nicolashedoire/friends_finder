import { Injectable } from '@angular/core';
import { LocalstorageService } from '../storage/localstorage.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  isAuthenticated(): void {}

  connect(): void {}

  disconnect(): void {
    this.router.navigate(['/login']);
  }
}
