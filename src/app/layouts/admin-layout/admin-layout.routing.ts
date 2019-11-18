import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { TeamComponent } from 'app/team/team.component';
import { TeamDetailComponent } from 'app/team-detail/team-detail.component';
import { TeamAddComponent } from 'app/team-add/team-add.component';
import { TaskAddComponent } from 'app/task/task-add/task-add.component';
import { TaskDetailComponent } from 'app/task/task-detail/task-detail.component';
import { TaskListComponent } from 'app/task/task-list/task-list.component';
import { BugAddComponent } from 'app/bug/bug-add/bug-add.component';
import { BugDetailComponent } from 'app/bug/bug-detail/bug-detail.component';
import { BugListComponent } from 'app/bug/bug-list/bug-list.component';
import { AuthGuard } from 'app/auth/auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'team', canActivate: [AuthGuard], component: TeamComponent },
    { path: 'icons', canActivate: [AuthGuard], component: IconsComponent },
    { path: 'team-detail/:id', canActivate: [AuthGuard], component: TeamDetailComponent },
    { path: 'team/add', canActivate: [AuthGuard], component: TeamAddComponent },
    { path: 'task/add', canActivate: [AuthGuard], component: TaskAddComponent },
    { path: 'task/detail/:id', canActivate: [AuthGuard], component: TaskDetailComponent },
    { path: 'task/list', canActivate: [AuthGuard], component: TaskListComponent },
    { path: 'bug/add', canActivate: [AuthGuard], component: BugAddComponent },
    { path: 'bug/detail/:id', canActivate: [AuthGuard], component: BugDetailComponent },
    { path: 'bug/list', canActivate: [AuthGuard], component: BugListComponent },

    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
