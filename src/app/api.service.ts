import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';


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
    return this.http.post<any>('https://daily-report1.herokuapp.com/oauth/token', loginPayload, { headers });
  }

  logout() {
    return this.http.delete<any>("https://daily-report1.herokuapp.com/api/logout");
  }
}
