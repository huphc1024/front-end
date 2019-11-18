import { Component, OnInit } from '@angular/core';
import { Team } from 'app/team-detail/team-detail.component';
import { Router } from '@angular/router';
import { TeamService } from 'app/team.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.scss']
})
export class TeamAddComponent implements OnInit {

  team: Team;
  submitted = false;
  addForm: FormGroup;
  leaders: any[];
  teamuserList: any[];
  apiURL: string = 'http://localhost:8080/api/team';
  constructor(private router: Router, private dataService: TeamService, private fb: FormBuilder) { }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      teamlead: ['', Validators.required],
      teamuser: ['', Validators.required]
    });
    this.dataService.getLeader().subscribe(items => {
      this.leaders = items.data;
    });
    this.dataService.getUsers().subscribe(items => {
      this.teamuserList = items.data;
    });
    console.log(this.leaders);
  }

  get fval() {
    return this.addForm.controls;
  }


  onSubmit() {
    let users = this.addForm.get('teamuser').value.map(function (item) {
      return { user_id: item }
    })
    let params = {
      name: this.addForm.get('name').value,
      users: users,
      teamlead: parseInt(this.addForm.get('teamlead').value)
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.dataService.createTeam(params).subscribe(data => {
      if (data.meta.code = 200) {
        console.log(data.data.name);
      } else {
        console.log("Add Fail");
      }
    });
    this.router.navigate(['/team']);
  }
}
