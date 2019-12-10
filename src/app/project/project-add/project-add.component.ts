import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from "app/ProjectService";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {
  selectedFoods = [30, 31];
  
  allfoods: any[] = [
    {value: 30, viewValue: 'Steak1'},
    {value: 31, viewValue: 'Pizza3'},
    {value: 32, viewValue: 'Tacos4'},
    {value: 33, viewValue: 'Pasta'}
  ];
  public Editor = ClassicEditor;
  submitted = false;
  addForm: FormGroup;
  listManagers: any[];
  listUsers: any[];
  isWait: any;
  constructor(private router: Router, private dataService: ProjectService, private fb: FormBuilder) { }
  ngOnInit() {
    this.createForm();
    let countRole = 0
    let user: any;
    if (sessionStorage.length > 0) {
      user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    if (localStorage.length > 0) {
      user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    user.data.roles.forEach(element => {
      if (element.role == 'ADMIN')
      countRole++;
    });
    if (countRole == 0) {
      this.router.navigate(["/403"])
    }
  }
  createForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      managers: ['', Validators.required],
      users: ['', Validators.required]
    });
    this.dataService.getManagers().subscribe(items => {
      this.listManagers = items.data;
    });
    this.dataService.getUsers().subscribe(items => {
      this.listUsers = items.data;
    });
  }

  get fval() {
    return this.addForm.controls;
  }

  async onSubmit() {
    let users = this.addForm.get('users').value.map(function (item) {
      return { user_id: item }
    })
    let managers = this.addForm.get('managers').value.map(function (item) {
      return { user_id: item }
    })
    let params = {
      name: this.addForm.get('name').value,
      description: this.addForm.get('description').value,
      users: users,
      managers: managers
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.isWait = true;
    await this.dataService.create(params).toPromise().then(data => {
      this.router.navigate(['/project'], {queryParams: {success: 'true'}});
      this.isWait = false;
    });
  }
}
