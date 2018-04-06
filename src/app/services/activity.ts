import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivityService {

  /**
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) {}

  /**
   * @return {Observable<any>}
   */
  getAll(): Observable<any> {
    return this.http
      .get(`http://localhost:4000/activities`);
  }

  /**
   * @return {Observable<any>}
   */
  post(activity: any): Observable<any> {
    return this.http.post(`http://localhost:4000/activity`, activity);
  }
}
