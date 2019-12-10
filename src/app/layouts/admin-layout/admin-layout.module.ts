import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSpinnerModule } from "ngx-spinner";

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatPaginatorIntl,
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatIconModule,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import { ProjectDetailComponent } from 'app/project/project-detail/project-detail.component';
import { ProjectComponent } from 'app/project/project/project.component';
import { TaskListComponent } from 'app/task/task-list/task-list.component';
import { TaskAddComponent } from 'app/task/task-add/task-add.component';
import { TaskDetailComponent } from 'app/task/task-detail/task-detail.component';
import { BugDetailComponent } from 'app/bug/bug-detail/bug-detail.component';
import { BugAddComponent } from 'app/bug/bug-add/bug-add.component';
import { BugListComponent } from 'app/bug/bug-list/bug-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'app/auth/jwt.interceptor';
import { ProjectAddComponent } from 'app/project/project-add/project-add.component';
import { CustomMatPaginatorIntl } from 'app/config/custompaging';
import { ProjectEditComponent } from 'app/project/project-edit/project-edit.component';
import { UserListComponent } from 'app/user/user-list/user-list.component';
import { UserAddComponent } from 'app/user/user-add/user-add.component';
import { UserEditComponent } from 'app/user/user-edit/user-edit.component';
import { ChangePassComponent } from 'app/user/change-pass/change-pass.component';
import { TaskEditComponent } from 'app/task/task-edit/task-edit.component';
import { AppDateAdapter, APP_DATE_FORMATS } from 'app/date.format';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CKEditorModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ProjectComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ProjectDetailComponent,
    ProjectAddComponent,
    TaskListComponent,
    TaskAddComponent,
    TaskDetailComponent,
    BugDetailComponent,
    BugAddComponent,
    BugListComponent,
    ProjectEditComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    ChangePassComponent,
    TaskEditComponent,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  {
    provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl
  },
  {
    provide: DateAdapter, useClass: AppDateAdapter
  },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }
  ],
})

export class AdminLayoutModule { }
