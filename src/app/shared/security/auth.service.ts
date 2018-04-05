import { Injectable } from '@angular/core';
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
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private socialAuthService: AuthService,
    private http: HttpClient
  ) {}

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      console.log(socialPlatform + ' sign in data : ', userData);
      this.http
        .post('http://localhost:4000/login', userData)
        .subscribe(response => {
          console.log(response);
          if (
            response['status'] === '200' ||
            response['status'] === 'ALREADY_EXISTS'
          ) {
            this.loggedIn.next(true);
            return true;
          }
        });
    });
  }

  isAuthenticated(): void {}

  connect(): void {}

  disconnect(): void {
    this.router.navigate(['/']);
  }
}
