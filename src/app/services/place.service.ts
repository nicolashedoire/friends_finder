import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../shared/security/auth.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {

  BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  /**
   * @return {Observable<any>}
   */
  search(place: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search/${place}`, { headers: this.authService.addAuthorizationHeader()});
  }

  /**
   * @return {Observable<any>}
   */
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/places`, { headers: this.authService.addAuthorizationHeader()});
  }


  add(place: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/place`, place , { headers: this.authService.addAuthorizationHeader()});
  }

  addFood(place: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/place/add-food`, place , { headers: this.authService.addAuthorizationHeader()});
  }

}
