import { Component, OnInit } from '@angular/core';
import { TeamService } from 'app/team.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: any [];
  p: Number;
  count: Number;
  constructor(private dataService: TeamService) { }


  ngOnInit() {
    this.dataService.getTeams().subscribe(items=>{
      console.log(items);
      this.teams = items.data.results;
      this.p = items.data.currentPage;
      this.count = items.data.totalPage;
      console.log(this.p);
    }) 
  }

}
