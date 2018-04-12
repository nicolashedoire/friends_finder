import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from '../shared/storage/localstorage.service';

@Injectable()
export class ActivityService {

  BASE_URL = 'http://localhost:4000';

  /**
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient, private localStorageService: LocalstorageService) {}

  /**
   * @return {Observable<any>}
   */
  getAll(): Observable<any> {
    const userData = JSON.parse(this.localStorageService.getItem('userData'));
    return this.http
      .get(`${this.BASE_URL}/activities`, {params : { userId : userData.id}});
  }

  /**
   * @return {Observable<any>}
   */
  getByPlaceId(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/activities/place/${id}`);
  }

  /**
   * @return {Observable<any>}
   */
  post(activity: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/activity`, activity);
  }

  /**
   * @return {Observable<any>}
   */
  delete(activity: any): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/activity`, activity);
  }
}