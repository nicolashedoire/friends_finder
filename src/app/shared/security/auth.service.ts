import { Injectable, Output, EventEmitter } from '@angular/core';
import { LocalstorageService } from '../storage/localstorage.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

import * as JWT from 'jwt-decode';

@Injectable()
export class AuthentificationService {
  constructor(
    private router: Router,
    private socialAuthService: AuthService,
    private localstorageService: LocalstorageService,
    private http: HttpClient
  ) {}

  socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    return this.socialAuthService
      .signIn(socialPlatformProvider)
      .then(userData => {
        return this.http.post('http://localhost:4000/login', userData);
      });
  }

  isAuthenticated() {
    return this.localstorageService.getItem('logged');
  }

  changeLoggedState(value: boolean) {
    this.localstorageService.setItem('logged', value);
  }

  disconnect(): void {
    this.localstorageService.clear();
    this.router.navigate(['/']);
  }

  decodeToken() {
    const token = this.localstorageService.getItem('jwt');
    return JWT(token);
  }

  addAuthorizationHeader() {
    const token = this.localstorageService.getItem('jwt');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return headers;
  }

  refreshData() {
    if (this.isAuthenticated()) {
      return this.decodeToken();
    }
  }
}
