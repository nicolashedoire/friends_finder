import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/security/auth.guard';
import { AuthLogin } from './shared/security/auth.login';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivityMenuComponent } from './activity-menu/activity-menu.component';
import { ActivityChoiceComponent } from './activity-choice/activity-choice.component';
import { ActivityItemComponent } from './activity-item/activity-item.component';
import { ActivityCompleteComponent } from './activity-complete/activity-complete.component';
import { QueriesComponent } from './queries/queries.component';
import { UserProfileComponent } from '../app/components/user-profile/user-profile.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthLogin]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity',
    component: ActivityMenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity/:choice',
    component: ActivityChoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity/:choice/:id',
    component: ActivityItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activity/:choice/:id/complete',
    component: ActivityCompleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'queries',
    component: QueriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
