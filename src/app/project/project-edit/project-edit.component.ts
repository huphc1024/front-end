import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'app/ProjectService';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  public Editor = ClassicEditor;
  submitted = false;
  addForm: FormGroup;
  listManagers: any[];
  listUsers: any[];
  isWait: any;
  project: any;
  userss: any[];
  selectUsers: any = [];
  selectManagers: any = [];
  managerss: any = [];
  constructor(private router: Router, private dataService: ProjectService, private fb: FormBuilder, private route: ActivatedRoute) { }
  ngOnInit() {
    this.createForm();
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getById(parseInt(id)).subscribe(data => {
      this.project = data.data;
      this.dataService.getUserByProject(parseInt(id)).subscribe(ele => {
        for (let element of ele.data) {
          this.selectUsers.push(element.user_id);
        };
        this.fval.users.setValue(this.selectUsers);
      });
      this.dataService.getManagersByProject(parseInt(id)).subscribe(aaa => {
        for (let element of aaa.data) {
          this.selectManagers.push(element.user_id);
        };
        this.fval.managers.setValue(this.selectManagers);
      });
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
      name: ['', Validators.required],
      description: ['', Validators.required],
      managers: ['', Validators.required],
      users: ['', Validators.required]
    });
    this.dataService.getManagers().subscribe(items => {
      this.listManagers = items.data;
    });
    this.dataService.getUsers().subscribe(items => {
      this.listUsers = items.data;
    });
  }

  get fval() {
    return this.addForm.controls;
  }

  async onSubmit(id: number) {
    let users = this.addForm.get('users').value.map(function (item) {
      return { user_id: item }
    })
    let managers = this.addForm.get('managers').value.map(function (item) {
      return { user_id: item }
    })
    console.log(managers);
    let params = {
      name: this.addForm.get('name').value,
      description: this.addForm.get('description').value,
      users: users,
      managers: managers,
      project_id: id,
      del_flg: '0',
      active: '0'
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.isWait = true;
    await this.dataService.update(params).toPromise().then(data => {
      this.router.navigate(['/project'], {queryParams: {success: 'true'}});
      this.isWait = false;
    });
  }
  setDataToForm() {
    this.fval.name.setValue(this.project.name);
    this.fval.description.setValue(this.project.description);
  }

}