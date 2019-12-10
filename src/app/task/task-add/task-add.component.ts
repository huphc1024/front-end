import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TaskService } from 'app/service/task.service';
import { ProjectService } from 'app/ProjectService';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {
  public Editor = ClassicEditor;
  submitted = false;
  addForm: FormGroup;
  listProject: any[];
  listUsers: any[];
  listManagers: any[];
  isWait: any;
  project_id: any;
  constructor(private router: Router, private dataService: TaskService, private projectService: ProjectService, private fb: FormBuilder) { }

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
      if (element.role == 'ADMIN' || element.role == 'MANAGER')
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
      projectId: ['', Validators.required],
      userId: ['', Validators.required],
      work_type: ['', Validators.required],
      start_date: ['', Validators.required],
      finish_date: ['', Validators.required]
    });
    this.projectService.getProjectsAddIssue().subscribe(items => {
      this.listProject = items.data;
    });
    // this.projectService.getUserByProject(this.project_id).subscribe(items => {
    //   this.listUsers = items.data;
    // });
  }

  get fval() {
    return this.addForm.controls;
  }

  async onSubmit() {
    let user_id = this.addForm.get('userId').value;
    let projectId = this.addForm.get('projectId').value;
    let work_type = this.addForm.get('work_type').value;
    let start_date = this.convertDateToString(this.addForm.get('start_date').value);
    let finish_date = this.convertDateToString(this.addForm.get('finish_date').value);
    let params = {
      name: this.addForm.get('name').value,
      description: this.addForm.get('description').value,
      user_id: user_id,
      project_id: projectId,
      work_type: work_type,
      start_date: start_date,
      finish_date: finish_date,
      status: '0',
      done: '0'
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.isWait = true;
    await this.dataService.createIssues(params).toPromise().then(data => {
      this.router.navigate(['/issue']);
      this.isWait = false;
    });
  }

  changeProject(value) {
    this.projectService.getUserByProject(value).subscribe(items => {
      this.listUsers = items.data;
      this.projectService.getManagersByProject(value).subscribe(man =>{
        this.listManagers = man.data;
      })
    });
  }
  convertDateToString(date) {
    if (!date) return '';
    if (date instanceof Date && isNaN(date.getTime())) return '';
    if (typeof date === 'string') return date;
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return day + '/' + month + '/' + date.getFullYear();
  }
}
