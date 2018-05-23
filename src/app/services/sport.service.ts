import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../shared/security/auth.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class SportService {

  BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  /**
   * @return {Observable<any>}
   */
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/sports`, { headers: this.authService.addAuthorizationHeader()});
  }

  /**
   * @return {Observable<any>}
   */
  add(sport: any): Observable<any> {

    console.log(sport);
    return this.http.post(`${this.BASE_URL}/sport/add`, {sportName: sport} , { headers: this.authService.addAuthorizationHeader()});
  }
}
