import { Injectable, Output, EventEmitter } from '@angular/core';
import { LocalstorageService } from '../storage/localstorage.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Injectable()
export class AuthentificationService {

  @Output() getLoggedState: EventEmitter<any> = new EventEmitter();

  public loggedIn = false;

  constructor(
    private router: Router,
    private socialAuthService: AuthService,
    private localstorageService: LocalstorageService,
    private http: HttpClient
  ) {}

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    return this.socialAuthService
      .signIn(socialPlatformProvider)
      .then(userData => {
        console.log(socialPlatform + ' sign in data : ', userData);
        return this.http.post('http://localhost:4000/login', userData);
      });
  }

  isAuthenticated() {

    const isLogged = this.localstorageService.getItem('logged');

    if (isLogged === null) {
      return false;
    } else {
      this.getLoggedState.emit(true);
      return true;
    }
  }

  changeLoggedState(value: boolean) {
    this.localstorageService.setItem('logged', value);
    this.loggedIn = value;
  }

  disconnect(): void {
    this.getLoggedState.emit(undefined);
    this.localstorageService.clear();
    this.router.navigate(['/']);
  }
}
