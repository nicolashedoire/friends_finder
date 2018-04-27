import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from '../shared/security/auth.service';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class QueryService {

  BASE_URL = 'http://localhost:4000';

  constructor(private http: HttpClient, private authService: AuthentificationService) { }

  /**
   * @return {Observable<any>}
   */
  getAll(): Observable<any> {
    const userData = this.authService.decodeToken();
    console.log(userData);
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.BASE_URL}/queries`, {params : { userId : userData['id']}, headers: this.authService.addAuthorizationHeader()});
  }

  /**
   * @return {Observable<any>}
   */
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/querie/${id}`, { headers: this.authService.addAuthorizationHeader()});
  }

}
