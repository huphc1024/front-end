import { Component, OnInit } from '@angular/core';
import { TeamService } from 'app/team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  constructor(private dataService: TeamService, private route: ActivatedRoute) { }

  id: number;
  team: any [];

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getTeamById(parseInt(id)).subscribe((data: any[])=>{
      console.log(data);
      this.team = data;
    }) 
  }

}
export interface Team{
    team_id: number;
    name: string;
    created: string;
    lastmodified: string;
    createdby_username: string;
    lastmodifiedby_username: string;
}
