import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiURL: string = 'https://daily-report1.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  public getTasks() {
    return this.http.get<any>(this.apiURL + '/tasks/user/2');
  }

  public getTaskById(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/task/' + id);
  }

  public createTask(obj: any): Observable<any> {
    return this.http.post(this.apiURL + '/task', obj);
  }

}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
