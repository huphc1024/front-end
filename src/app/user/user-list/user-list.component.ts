import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any[];
  pageSize: number;
  length: number;
  isDel = false;
  isAdmin = false;
  searchForm: FormGroup;
  name: any;
  date: any;
  constructor(private dataService: UserService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit() {
    this.dataService.getUsers(1, 10, '', '').subscribe(items => {
      if (items.data != null) {
        this.users = items.data.results;
        this.length = items.data.totalRecords;
        this.pageSize = items.data.noRecordInPage;
      } else {
        this.users = null;
      }
    });
    let success: any;
    this.route.queryParams.subscribe(params => {
      success = params['success'];
    });
    if (success) {
      this.isDel = true;
    } else {
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
      if (element.role == 'ADMIN')
        countRole++;
    });
    if (countRole > 0) {
      this.isAdmin = true;
    }
    if (!this.isAdmin) {
      this.router.navigate(["/403"])
    }
    this.searchForm = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
    });
  }

  pageChangeEvent(event) {
    const offset = (event.pageIndex + 1);
    const size = event.pageSize;
    this.name = this.searchForm.get('name').value;
    this.date = this.searchForm.get('date').value;
    this.dataService.getUsers(offset, size, this.name, this.date).subscribe(items => {
      this.users = items.data.results;
      this.length = items.data.totalRecords;
      this.pageSize = event.pageSize;
    });
    this.isDel = false;
  }
  delete(email: string) {
    let txt;
    let r = confirm("Bạn có chắc chắn xóa?");
    if (r == true) {
      let params = {
        email: email,
        del_flg: '1'
      };
      this.dataService.update(params).subscribe(
        res => {
          this.dataService.getUsers(1, 10, this.name ? this.name : '', this.date ? this.date : '').subscribe(items => {
            this.users = items.data.results;
            this.length = items.data.totalRecords;
            this.pageSize = items.data.noRecordInPage;
            this.isDel = true;
            //this.router.navigate(["/user?success=true"]);
          });
        }
      );

    }
  }

  reset(email: string) {
    let txt;
    let r = confirm("Bạn có chắc chắn reset mật khẩu?");
    if (r == true) {
      let params = {
        email: email
      };
      this.dataService.reset(params).subscribe(
        res => {
          this.dataService.getUsers(1, 10, this.name ? this.name : '', this.date ? this.date : '').subscribe(items => {
            this.users = items.data.results;
            this.length = items.data.totalRecords;
            this.pageSize = items.data.noRecordInPage;
            this.isDel = true;
            //this.router.navigate(["/user?success=true"]);
          });
        }
      );

    }
  }
  onSubmit() {
    const offset = 1;
    const size = 10;
    this.name = this.searchForm.get('name').value;
    this.date = this.searchForm.get('date').value;
    let dateConvert = this.convertDateToString(this.date);
    this.dataService.getUsers(offset, this.pageSize, this.name, dateConvert).subscribe(items => {
      console.log(items);
      if (items.data != null) {
        this.users = items.data.results;
      } else {
        this.users = null;
      }
      this.length = items.data.totalRecords;
    });
    console.log(this.users);
  }

  resetForm() {
    this.dataService.getUsers(1, 10, '', '').subscribe(items => {
      if (items.data != null) {
        this.users = items.data.results;
        this.length = items.data.totalRecords;
        this.pageSize = items.data.noRecordInPage;
      } else {
        this.users = null;
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
