import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  addForm: FormGroup;
  user: any;
  role_id: number;
  isWait: any;
  isValidEmail = false;
  submitted = false;
  roles: any[] = [{ key: 1, value: 'ADMIN' }, { key: 2, value: 'MANAGER' }, { key: 3, value: 'MEMBER' }];
  constructor(private router: Router, private dataService: UserService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getUser(parseInt(id)).subscribe(data => {
      this.user = data.data;
      if (data.data.roles == 'ADMIN') {
        this.role_id = 1;
      } else if (data.data.roles == 'MANAGER') {
        this.role_id = 2;
      } else {
        this.role_id = 3;
      }
      this.setDataToForm();
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
      if (element.role == 'ADMIN')
      countRole++;
    });
    if (countRole == 0) {
      this.router.navigate(["/403"])
    }
  }
  createForm() {
    this.addForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', Validators.required],
      role_id: ['', Validators.required],
    });

  }

  get fval() {
    return this.addForm.controls;
  }
  async onSubmit(id: number) {
    let role_id = this.fval.role_id.value;
    let email = this.fval.email.value
    let fullname = this.fval.fullname.value
    let params = {
      user_id : id,
      email: email,
      fullname: fullname,
      role_id: role_id,
      del_flg: '0'
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    this.isWait = true;
    await this.dataService.update(params).toPromise().then(data => {
      this.isWait = false;
      this.router.navigate(['/user'], {queryParams: {success: 'true'}});
    });
  
  }


  setDataToForm() {
    this.fval.email.setValue(this.user.email);
    this.fval.email.disable();
    this.fval.fullname.setValue(this.user.fullname);
    this.fval.role_id.setValue(this.role_id);
  }
}
