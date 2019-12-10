import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { ProjectComponent } from 'app/project/project/project.component';
import { TaskAddComponent } from 'app/task/task-add/task-add.component';
import { TaskDetailComponent } from 'app/task/task-detail/task-detail.component';
import { TaskListComponent } from 'app/task/task-list/task-list.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { ProjectDetailComponent } from 'app/project/project-detail/project-detail.component';
import { ProjectAddComponent } from 'app/project/project-add/project-add.component';
import { ProjectEditComponent } from 'app/project/project-edit/project-edit.component';
import { UserListComponent } from 'app/user/user-list/user-list.component';
import { UserAddComponent } from 'app/user/user-add/user-add.component';
import { UserEditComponent } from 'app/user/user-edit/user-edit.component';
import { ChangePassComponent } from 'app/user/change-pass/change-pass.component';
import { TaskEditComponent } from 'app/task/task-edit/task-edit.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'project', canActivate: [AuthGuard], component: ProjectComponent },
    { path: 'icons', canActivate: [AuthGuard], component: IconsComponent },
    { path: 'project/detail/:id', canActivate: [AuthGuard], component: ProjectDetailComponent },
    { path: 'project/edit/:id', canActivate: [AuthGuard], component: ProjectEditComponent },
    { path: 'project/add', canActivate: [AuthGuard], component: ProjectAddComponent },
    { path: 'issue/add', canActivate: [AuthGuard], component: TaskAddComponent },
    { path: 'issue/detail/:id', canActivate: [AuthGuard], component: TaskDetailComponent },
    { path: 'issue/edit/:id', canActivate: [AuthGuard], component: TaskEditComponent },
    { path: 'issue', canActivate: [AuthGuard], component: TaskListComponent },
    { path: 'user', canActivate: [AuthGuard], component: UserListComponent },
    { path: 'user/add', canActivate: [AuthGuard], component: UserAddComponent },
    { path: 'user/edit/:id', canActivate: [AuthGuard], component: UserEditComponent },
    { path: 'change-pass', canActivate: [AuthGuard], component: ChangePassComponent },
];
