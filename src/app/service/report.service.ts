import { Injectable } from '@angular/core';
import { Constant } from 'app/constant/constant';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  public getReport(page: number, size: number, issue_id: number) {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(Constant.apiURL + '/api/reports/issue/' + issue_id, { params });
  }
  public getReportById(id: number) {
    return this.http.get<any>(Constant.apiURL + '/api/report/' + id);
  }

  public create(obj: any): Observable<any> {
    return this.http.post(Constant.apiURL + '/api/report', obj);
  }

  public update(obj: any): Observable<any> {
    return this.http.put(Constant.apiURL + '/api/report', obj);
  }
}
