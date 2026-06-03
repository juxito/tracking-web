import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';

import { UsersStore } from './services/users.store';
import { UserSidenavComponent } from "./components/user-sidenav/user-sidenav.component";
import { UiService } from '../../core/services/ui.service';
import { User } from '../../services/user';

@Component({
  standalone: true,
  imports: [CommonModule, MatSidenavModule],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  @ViewChild('globalSidenav') sidenav!: MatSidenav;

  // users$!: any;
  users$!: Observable<User[]>;
  
  viewMode: 'cards' | 'table' = 'cards';
  
  sidenavOpen = false;
  selectedUser: User | null = null;
  
  constructor(private store: UsersStore, public ui: UiService) {
    this.users$ = this.store.users$;
  }

  ngOnInit() {
    this.store.loadUsers();
  }

  toggleView(mode: 'cards' | 'table') {
    this.viewMode = mode;
  }

  openCreate() {
    this.selectedUser = null;

    console.log('CLICK');
    this.ui.open(UserSidenavComponent, null);
  }

  openEdit(user: User) {
    console.log('user: ', user);
    
    this.selectedUser = user;
    this.ui.open(UserSidenavComponent, user);
  }

  closeSidenav() {
    this.ui.close();
  }
}