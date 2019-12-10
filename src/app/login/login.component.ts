import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';
import { HttpParams } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string = '';
  submitted = false;
  denessLogin = false;
  isWait = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    window.sessionStorage.removeItem('user');
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      rememberMe: ['', '']
    });
  }

  get fval() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isWait = true;
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.fval.email.value)
      .set('password', this.fval.password.value)
      .set('grant_type', 'password');
    
    this.apiService.login(body.toString()).subscribe(data => {
      if (this.fval.rememberMe.value) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      sessionStorage.setItem('user', JSON.stringify(data));
      this.apiService.getUserInfo().subscribe(e => {
        if (this.fval.rememberMe.value) {
          localStorage.setItem('userInfo', JSON.stringify(e));
        }
        sessionStorage.setItem('userInfo', JSON.stringify(e));
        this.router.navigate([this.returnUrl]);
      })
      this.isWait = false;
    })
    let currentUser: { access_token: any; };
    if (sessionStorage.length > 0) {
      currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
    if (localStorage.length > 0) {
      currentUser = JSON.parse(localStorage.getItem('user'));
    }
    if (!currentUser) {
      this.denessLogin = true;
      return;
    }
  }
}
