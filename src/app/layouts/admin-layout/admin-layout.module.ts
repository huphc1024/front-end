import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { TeamComponent } from '../../team/team.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { TeamDetailComponent } from 'app/team-detail/team-detail.component';
import { TeamAddComponent } from 'app/team-add/team-add.component';
import { TaskListComponent } from 'app/task/task-list/task-list.component';
import { TaskAddComponent } from 'app/task/task-add/task-add.component';
import { TaskDetailComponent } from 'app/task/task-detail/task-detail.component';
import { BugDetailComponent } from 'app/bug/bug-detail/bug-detail.component';
import { BugAddComponent } from 'app/bug/bug-add/bug-add.component';
import { BugListComponent } from 'app/bug/bug-list/bug-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'app/auth/jwt.interceptor';
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
    MatNativeDateModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TeamComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    TeamDetailComponent,
    TeamAddComponent,
    TaskListComponent,
    TaskAddComponent,
    TaskDetailComponent,
    BugDetailComponent,
    BugAddComponent,
    BugListComponent,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
})

export class AdminLayoutModule {}
