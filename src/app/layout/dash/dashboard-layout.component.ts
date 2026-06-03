import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';

import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/shared/topbar/topbar.component';
import { FootbarComponent } from '../../components/shared/footbar/footbar.component';
import { UserSidenavComponent } from '../../pages/users/components/user-sidenav/user-sidenav.component';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TopbarComponent,
    FootbarComponent,
    MatSidenavModule,
    // UserSidenavComponent
  ],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {
  sidebarCollapsed = false;

  constructor(public ui: UiService) {}

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}