import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Input() collapsed = false;

  showUserMenu = false;
  showNotifications = false;

  notifications = [
    { title: 'Nuevo asset registrado', time: 'hace 5 min' },
    { title: 'Usuario actualizado', time: 'hace 1 hora' },
    { title: 'Mantenimiento programado', time: 'hace 2 horas' },
  ];

  constructor(
    public theme: ThemeService,
    public router: Router,
    private auth: AuthService
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
