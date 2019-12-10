import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Constant } from './constant/constant';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic Y2xpZW50SWQ6MTIzNDU2',
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post<any>(Constant.apiURL + '/oauth/token', loginPayload, { headers });
  }

  getUserInfo(){
    return this.http.get<any>(Constant.apiURL + '/api/info-user');
  }

  logout() {
    return this.http.delete<any>(Constant.apiURL + "/api/logout");
  }
}
