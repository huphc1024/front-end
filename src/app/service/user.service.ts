import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constant } from 'app/constant/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers(page: number, size: number, name: string, date: string) {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size',size.toString())
    .set('fullname', name)
    .set('date', date);
    return this.http.get<any>(Constant.apiURL + '/api/users', {params});
  }
  public getUser(id: number) {
    return this.http.get<any>(Constant.apiURL + '/api/user/' + id);
  }

  public create(obj: any): Observable<any> {
    return this.http.post(Constant.apiURL + '/api/user', obj);
  }

  public update(obj: any): Observable<any> {
    return this.http.put(Constant.apiURL + '/api/user', obj);
  }

  public reset(obj: any): Observable<any> {
    return this.http.put(Constant.apiURL + '/api/user/reset', obj);
  }

  public change_pass(obj: any): Observable<any> {
    return this.http.put(Constant.apiURL + '/api/change-pass', obj);
  }
}
