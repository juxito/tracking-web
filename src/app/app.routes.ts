import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dash/dashboard-layout.component';

// Pages
import { UserListComponent } from './components/user-list/user-list';

// (puedes crear después estos)
import { HomeComponent } from './pages/home/home.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'devices',
        component: DevicesComponent
      },
      {
        path: 'assets',
        component: AssetsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];