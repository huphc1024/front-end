import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  returnUrl: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit() {
    window.sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required],
      rememberMe : ['', '']
    });
  }

  get fval() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.fval.email.value)
      .set('password', this.fval.password.value)
      .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
      if (this.fval.rememberMe.value){
        localStorage.setItem('user', JSON.stringify(data));
      }
      sessionStorage.setItem('user', JSON.stringify(data));
      this.router.navigate([this.returnUrl]);
    });
  }
}
