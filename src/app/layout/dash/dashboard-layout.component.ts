import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/shared/topbar/topbar.component';
import { FootbarComponent } from '../../components/shared/footbar/footbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    TopbarComponent,
    FootbarComponent
  ],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}