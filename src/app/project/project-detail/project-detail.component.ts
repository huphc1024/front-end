import { Component, OnInit } from '@angular/core';
import { ProjectService } from "app/ProjectService";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  constructor(private router: Router,private dataService: ProjectService, private route: ActivatedRoute) { }

  id: number;
  project: any;
  users: any[];
  managers: any[];
  isAdmin = false;
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getById(parseInt(id)).subscribe((data: any)=>{
      this.project = data.data;
      this.dataService.getUserByProject(parseInt(id)).subscribe((data: any) =>{
        this.users = data.data;
        console.log(this.users);
      });
      this.dataService.getManagersByProject(parseInt(id)).subscribe((data: any) =>{
        this.managers = data.data;
      });
    });
    let countRole = 0
    let user: any;
    if (sessionStorage.length > 0) {
      user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    if (localStorage.length > 0) {
      user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    user.data.roles.forEach(element => {
      if(element.role == 'ADMIN')
      countRole++;
    });
    if (countRole > 0) {
      this.isAdmin = true;
    }
  }
  edit(id: number){
    this.router.navigate(['/project/edit/', id]);
  }

}
