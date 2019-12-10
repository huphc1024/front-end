import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constant } from './constant/constant';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {
  }
  getProjects(page: number, size: number, name: string, date: string) {
    let params = new HttpParams().set('page', page ? page.toString() : '').set('size',size ? size.toString() : '').set('name', name).set('date', date);
    // if(name != null && name.length > 0){
    //   params.
    // }
    // if(date != null && date.length > 0){
    //   params.set('date', date)
    // }
    return this.http.get<any>(Constant.apiURL + '/api/projects', {params});
  }
  public getById(id: number) {
    return this.http.get<any>(Constant.apiURL + '/api/project/' + id);
  }
  public create(obj: any) {
    return this.http.post<any>(Constant.apiURL + '/api/project', obj);
  }
  public getManagers() {
    return this.http.get<any>(Constant.apiURL + '/api/managers');
  }
  public getUsers() {
    return this.http.get<any>(Constant.apiURL + '/api/users/add-project');
  }
  public getUserByProject(id: number){
    return this.http.get<any>(Constant.apiURL + '/api/users/project/'+id);
  }
  public getManagersByProject(id: number){
    return this.http.get<any>(Constant.apiURL + '/api/managers/project/'+id);
  }
  public getProjectsAddIssue(){
    return this.http.get<any>(Constant.apiURL + '/api/projects/add-issue');
  }
  public update(obj: any) {
    return this.http.put<any>(Constant.apiURL + '/api/project', obj);
  }
}
