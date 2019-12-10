import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  submitted = false;
  addForm: FormGroup;
  isWait: any;
  isValidPass = false;
  hide = true;
  isDel = false;
  constructor(private router: Router, private dataService: UserService, private fb: FormBuilder) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.addForm = this.fb.group({
      password: ['', Validators.required],
      password_new: ['', Validators.required],
    });

  }

  get fval() {
    return this.addForm.controls;
  }

  async onSubmit() {
    let password = this.fval.password.value;
    let password_new = this.fval.password_new.value;
    let email = null;
    if (localStorage.length > 0) {
      email = JSON.parse(localStorage.getItem('userInfo')).data.email;
    }
    email = JSON.parse(sessionStorage.getItem('userInfo')).data.email;
    let params = {
      email: email,
      password_old: password,
      password: password_new
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    let code = null;
    this.isWait = true;
    await this.dataService.change_pass(params).toPromise().then(data => {
      this.isWait = false;
      code = data.meta.code;
    });
    if (code == '404') {
      this.isValidPass = true;
      this.isDel = false;
    } else {
      this.isValidPass = false;
      this.isDel = true;
    }
  }

}
