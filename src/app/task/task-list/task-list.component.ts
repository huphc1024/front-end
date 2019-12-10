import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/service/task.service';
import { ApiService } from 'app/api.service';
import { async } from 'rxjs/internal/scheduler/async';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectService } from 'app/ProjectService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  issues: any[];
  work_type_task = 'Task';
  work_type_bug = 'Bug';
  status_open = 'Open';
  status_inprocess = 'Inprocess';
  status_close = 'Close';
  isAdmin = false;
  pageSize: number;
  length: number;
  isDel = true;
  searchForm: FormGroup;
  name: any;
  date: any;
  work_type: any;
  status: any;
  project_id: number;
  listProject: any;
  constructor(private dataService: TaskService, private apiService: ApiService, private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getIssues(1, 10, '', '', '', '', 0).subscribe(items => {
      if (items.data == null) {
        this.issues = null;
      } else {
        this.issues = items.data.results;
      }
      this.length = items.data.totalRecords;
      this.pageSize = items.data.noRecordInPage;
    });
    let success: any;
    this.route.queryParams.subscribe(params => {
      success = params['success'];
    });
    if(success){
      this.isDel = true;
    }else{
      this.isDel = false;
    }
    let countRole = 0
    let user: any;
    if (sessionStorage.length > 0) {
      user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    if (localStorage.length > 0) {
      user = JSON.parse(sessionStorage.getItem('userInfo'));
    }
    user.data.roles.forEach(element => {
      if(element.role == "ADMIN" || element.role == "MANAGER")
      countRole++;
    });
    if (countRole > 0) {
      this.isAdmin = true;
    }
    this.projectService.getProjects(null,null,'','').subscribe(items => {
      this.listProject = items.data.results;
    });
    this.searchForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl(),
      status: new FormControl(),
      work_type: new FormControl(),
      project_id: new FormControl()
    });
  }

  onSubmit() {
    const offset = 1;
    const size = 10;
    this.name = this.searchForm.get('name').value;
    this.date = this.searchForm.get('date').value;
    this.status = this.searchForm.get('status').value;
    this.work_type = this.searchForm.get('work_type').value;
    this.project_id = this.searchForm.get('project_id').value;
    let dateConvert = this.convertDateToString(this.date);
    this.dataService.getIssues(offset, this.pageSize, this.name, dateConvert, this.status, this.work_type, this.project_id ? this.project_id : 0).subscribe(items => {
      console.log(items);
      if (items.data != null) {
        this.issues = items.data.results;
        this.length = items.data.totalRecords;
      } else {
        this.issues = null;
      }
      
    });
  }

  resetForm() {
    this.dataService.getIssues(1, 10, '', '', '', '', 0).subscribe(items => {
      if (items.data != null) {
        this.issues = items.data.results;
        this.length = items.data.totalRecords;
      } else {
        this.issues = null;
      }
    });
  }

  pageChangeEvent(event) {
    const offset = (event.pageIndex + 1);
    const size = event.pageSize;
    this.name = this.searchForm.get('name').value;
    this.date = this.searchForm.get('date').value;
    this.status = this.searchForm.get('status').value;
    this.work_type = this.searchForm.get('work_type').value;
    this.project_id = this.searchForm.get('project_id').value;
    this.dataService.getIssues(offset, size, this.name, this.date, this.status, this.work_type, this.project_id).subscribe(items => {
      this.issues = items.data.results;
      this.length = items.data.totalRecords;
      this.pageSize = event.pageSize;
    });
  }
  delete(id: number) {
    let txt;
    let r = confirm("Bạn có chắc chắn xóa!");
    if (r == true) {
      let params = {
        issue_id: id,
        del_flg: '1'
      };
      this.dataService.update(params).subscribe(
        res => {
          this.dataService.getIssues(1, this.pageSize, this.name ? this.name : '', this.date ? this.date : '', this.status ? this.status : '', this.work_type ? this.work_type : '', this.project_id ? this.project_id : 0).subscribe(items => {
            if (items.data != null) {
              this.issues = items.data.results;
            } else {
              this.issues = null;
            }
            this.length = items.data.totalRecords;
            this.pageSize = items.data.noRecordInPage;
            this.isDel = true;
          });
        }
      );
      // window.location.reload();

      // this.router.navigate["/project?success=true"];
    }
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
