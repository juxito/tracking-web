import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dash/dashboard-layout.component';
import { UserListComponent } from './components/user-list/user-list';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'users',
        component: UserListComponent
      }
    ]
  }
];