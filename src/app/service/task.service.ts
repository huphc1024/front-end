import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Constant } from 'app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getIssues(page: number, size: number, name: string, date: string, status: string, work_type: string, project_id: number) {
    let params = new HttpParams().set('page', page.toString()).set('size',size.toString()).set('name', name).set('date', date)
    .set('status', status).set('work_type', work_type).set('project_id', project_id.toString());
    return this.http.get<any>(Constant.apiURL + '/api/issues', {params});
  }
  public getIssuesByUser(id: number) {
    return this.http.get<any>(Constant.apiURL + '/api/issues/user/' + id);
  }
  public getIssuesByProject(id: number) {
    return this.http.get<any>(Constant.apiURL + '/api/issues/project/'+id);
  }

  public getIssuesById(id: number): Observable<any> {
    return this.http.get<any>(Constant.apiURL + '/api/issue/' + id);
  }

  public getIssuesDetail(id: number): Observable<any> {
    return this.http.get<any>(Constant.apiURL + '/api/issue-detail/' + id);
  }

  public createIssues(obj: any): Observable<any> {
    return this.http.post(Constant.apiURL + '/api/issue', obj);
  }

  public update(obj: any): Observable<any> {
    return this.http.put(Constant.apiURL + '/api/issue', obj);
  }

}
