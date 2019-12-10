import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'app/service/task.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProjectService } from 'app/ProjectService';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  id: number;
  issue: any;
  status: any;
  work_type: any;
  public Editor = ClassicEditor;
  submitted = false;
  addForm: FormGroup;
  listProject: any[];
  listUsers: any[];
  isWait: any;
  project_id: any;
  constructor(private router: Router, private dataService: TaskService, private route: ActivatedRoute, private projectService: ProjectService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getIssuesDetail(parseInt(id)).subscribe((data: any) => {
      this.issue = data.data;
      this.setDataForm();
    });
  }
  createForm() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      projectId: ['', Validators.required],
      userId: ['', Validators.required],
      work_type: ['', Validators.required],
      start_date: ['', Validators.required],
      finish_date: ['', Validators.required],
      status: ['', Validators.required],
      done: ['', Validators.required]
    });
    this.route.queryParams.subscribe(params => {
      this.project_id = params['project_id'];
    });
    this.projectService.getProjectsAddIssue().subscribe(items => {
      this.listProject = items.data;
      this.projectService.getUserByProject(this.project_id).subscribe(data => {
        this.listUsers = data.data;
      });
    });
    
  }

  get fval() {
    return this.addForm.controls;
  }

  async onSubmit() {
    let user_id = this.addForm.get('userId').value;
    let projectId = this.addForm.get('projectId').value;
    let work_type = this.addForm.get('work_type').value;
    let status = this.addForm.get('status').value;
    let done = this.addForm.get('done').value;
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
      status: status,
      done: done,
      del_flg: '0',
      issue_id: this.issue.issue_id
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.isWait = true;
    await this.dataService.update(params).toPromise().then(data => {
      this.router.navigate(['/issue'], {queryParams : {success : 'true'}});
      this.isWait = false;
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

  setDataForm(){
    this.fval.name.setValue(this.issue.name);
    this.fval.name.disable();
    this.fval.projectId.setValue(this.issue.project_id);
    this.fval.projectId.disable();
    this.fval.userId.setValue(this.issue.user_id);
    this.fval.userId.disable();
    this.fval.start_date.setValue(new Date(this.issue.start_date.split("/").reverse().join("/")));
    this.fval.start_date.disable();
    this.fval.finish_date.setValue(new Date(this.issue.finish_date.split("/").reverse().join("/")));
    this.fval.finish_date.disable();
    this.fval.work_type.setValue(parseInt(this.issue.work_type));
    this.fval.work_type.disable();
    this.fval.status.setValue(parseInt(this.issue.status));
    this.fval.done.setValue(parseInt(this.issue.done));
    this.fval.description.setValue(this.issue.description);
  }
}
