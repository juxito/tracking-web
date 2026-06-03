import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UiService {

  sidenavOpen = signal(false);
  selectedUser = signal<User | null>(null);

  openCreate() {
    this.selectedUser.set(null);
    this.sidenavOpen.set(true);
  }

  openEdit(user: User) {
    this.selectedUser.set(user);
    this.sidenavOpen.set(true);
  }

  close() {
    this.sidenavOpen.set(false);
  }
}