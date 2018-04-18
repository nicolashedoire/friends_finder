import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from '../shared/storage/localstorage.service';
import { AuthentificationService } from '../shared/security/auth.service';

@Injectable()
export class ActivityService {

  BASE_URL = 'http://localhost:4000';

  /**
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private authService: AuthentificationService) {}

  /**
   * @return {Observable<any>}
   */
  getAll(): Observable<any> {
    const userData = this.authService.decodeToken();
    return this.http
      .get(`${this.BASE_URL}/activities`, {params : { userId : userData['id']}, headers: this.authService.addAuthorizationHeader()});
  }

  /**
   * @return {Observable<any>}
   */
  getByPlaceId(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/activities/place/${id}`, { headers: this.authService.addAuthorizationHeader()});
  }

  /**
   * @return {Observable<any>}
   */
  post(activity: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/activity`, activity, { headers: this.authService.addAuthorizationHeader()});
  }

  /**
   * @return {Observable<any>}
   */
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/activity/${id}`, { headers: this.authService.addAuthorizationHeader()});
  }
}
