import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  hovering = false;

  navItems = [
    { route: '', label: 'Dashboard', icon: 'dashboard' },
    { route: 'devices', label: 'Devices', icon: 'devices' },
    { route: 'assets', label: 'Assets', icon: 'inventory_2' },
    { route: 'users', label: 'Usuarios', icon: 'group' },
    { route: 'map', label: 'Mapa', icon: 'map' },
    { route: 'settings', label: 'Ajustes', icon: 'settings' }
  ];

  constructor(public router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }

  get isExpanded() {
    return !this.collapsed || this.hovering;
  }
}