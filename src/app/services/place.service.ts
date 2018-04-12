import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {

  BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  /**
   * @return {Observable<any>}
   */
  search(place: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search/${place}`);
  }

  /**
   * @return {Observable<any>}
   */
  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/places`);
  }

}
