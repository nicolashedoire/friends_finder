import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from '../shared/storage/localstorage.service';
import { AuthentificationService } from '../shared/security/auth.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ActivityService {

  private subject = new Subject<any>();

  BASE_URL = 'http://localhost:4000';

  /**
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient, private localStorageService: LocalstorageService, private authService: AuthentificationService) {}

  sendSignal() {
    this.subject.next();
  }

  getChange() {
    return this.subject.asObservable();
  }

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
  getAllToday(): Observable<any> {
    const userData = this.authService.decodeToken();
    return this.http
      .get(`${this.BASE_URL}/activities/today`, {params : { userId : userData['id']}, headers: this.authService.addAuthorizationHeader()});
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
  delete(activity: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/activity/${activity._id}`, activity , { headers: this.authService.addAuthorizationHeader()});
  }

  /**
   * @return {Observable<any>}
   */
  join(activity: any, user: any): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post(`${this.BASE_URL}/activity/join/${activity._id}`, user , { headers: this.authService.addAuthorizationHeader()});
  }
}
