import { Component, OnInit } from '@angular/core';
import { ProjectService } from "app/ProjectService";
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  teams: any[];
  pageSize: number;
  length: number;
  isDel = false;
  isAdmin = false;
  searchForm: FormGroup;
  name: any;
  date: any;
  constructor(private dataService: ProjectService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.dataService.getProjects(1, 10, '', '').subscribe(items => {
      if(items.data != null){
        this.teams = items.data.results;
        this.length = items.data.totalRecords;
        this.pageSize = items.data.noRecordInPage;
      }else{
        this.teams = null;
      }
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
      if(element.role == 'ADMIN')
      countRole++;
    });
    if (countRole > 0) {
      this.isAdmin = true;
    }
    this.searchForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
    });
  }

  pageChangeEvent(event) {
    const offset = (event.pageIndex + 1);
    const size = event.pageSize;
    this.name = this.searchForm.get('name').value.map(function (item) {
      return item
    })
    this.date = this.searchForm.get('date').value.map(function (item) {
      return item
    })
    this.dataService.getProjects(offset, size, this.name, this.date).subscribe(items => {
      this.teams = items.data.results;
      this.length = items.data.totalRecords;
      this.pageSize = event.pageSize;
    });
  }
  delete(id: number) {
    let txt;
    let r = confirm("Bạn có chắc chắn xóa!");
    if (r == true) {
      let params = {
        project_id: id,
        del_flg: '1'
      };
      this.dataService.update(params).subscribe(
        res => {
          this.dataService.getProjects(1, 10, this.name ? this.name : '', this.date ? this.date : '').subscribe(items => {
            this.teams = items.data.results;
            this.length = items.data.totalRecords;
            this.pageSize = items.data.noRecordInPage;
            this.isDel = true;
          });
        }
      );
      //window.location.reload();

      //this.router.navigate["/project?success=true"];
    }
  }
  onSubmit() {
    const offset = 1;
    const size = 10;
    this.name = this.searchForm.get('name').value;
    this.date = this.searchForm.get('date').value;
    let dateConvert = this.convertDateToString(this.date);
    this.dataService.getProjects(offset, this.pageSize, this.name, dateConvert).subscribe(items => {
      console.log(items);
      if (items.data != null) {
        this.teams = items.data.results;
      } else {
        this.teams = null;
      }
      this.length = items.data.totalRecords;
    });
    console.log(this.teams);
  }

  resetForm() {
    this.dataService.getProjects(1, 10, '', '').subscribe(items => {
      if(items.data != null){
        this.teams = items.data.results;
        this.length = items.data.totalRecords;
        this.pageSize = items.data.noRecordInPage;
      }else{
        this.teams = null;
      }
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
