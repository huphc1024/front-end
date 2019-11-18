import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TeamService {
  apiURL: string = 'https://daily-report1.herokuapp.com/api';
  public token;
  apiURLgetLeaders: string = 'https://daily-report1.herokuapp.com/api/leaders';
  constructor(private http: HttpClient) {
   }

   getTeams() {
    return this.http.get<any>(this.apiURL + '/teams');
  }

  public getTeamById(id: number): Observable<any> {
    return this.http.get<any>(this.apiURL + '/team/' + id);
  }

  public createTeam(obj: any): Observable<any> {
    return this.http.post(this.apiURL + '/team', obj);
  }

  public getLeader(){
    return this.http.get<any>(this.apiURLgetLeaders);
  }

  public getUsers(){
    return this.http.get<any>(this.apiURL+'/users/add-team');
  }
}
