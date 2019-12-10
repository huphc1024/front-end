import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  submitted = false;
  addForm: FormGroup;
  isWait: any;
  isValidEmail = false;
  isAdmin = false;
  constructor(private router: Router, private dataService: UserService, private fb: FormBuilder) { }
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
    if (countRole > 0) {
      this.isAdmin = true;
    }
    if(!this.isAdmin){
      this.router.navigate(["/403"])
    }
  }
  createForm() {
    this.addForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      fullname: ['', Validators.required],
      role_id: ['', Validators.required],
    });

  }

  get fval() {
    return this.addForm.controls;
  }

  async onSubmit() {
    let role_id = this.addForm.get('role_id').value;
    let email = this.addForm.get('email').value;
    let fullname = this.addForm.get('fullname').value;
    let params = {
      email: email,
      fullname: fullname,
      role_id: role_id
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    let code = null;
    this.isWait = true;
    await this.dataService.create(params).toPromise().then(data => {
      this.isWait = false;
      code = data.meta.code;
    });
    if(code == '403'){
     this.isValidEmail = true;
     return;
    }
    this.router.navigate(['/user'], {queryParams: {success: 'true'}});
  }

}
