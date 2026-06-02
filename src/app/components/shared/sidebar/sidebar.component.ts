import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  hovering = false;

  navItems = [
    { route: '', label: 'Dashboard', icon: 'dashboard', roles: ['admin', 'user'] },
    { route: 'devices', label: 'Devices', icon: 'devices', roles: ['admin', 'user'] },
    { route: 'assets', label: 'Assets', icon: 'inventory_2', roles: ['admin', 'user'] },
    { route: 'users', label: 'Usuarios', icon: 'group', roles: ['admin'] },
    { route: 'map', label: 'Mapa', icon: 'map', roles: ['admin', 'user'] },
    { route: 'settings', label: 'Ajustes', icon: 'settings', roles: ['admin'] },
  ];

  constructor(
    public router: Router,
    private auth: AuthService,
  ) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }

  get isExpanded() {
    return !this.collapsed || this.hovering;
  }

  get filteredNavItems() {
    const role = this.auth.getRole();
    return this.navItems.filter((i) => i.roles.includes(role!));
  }
}
