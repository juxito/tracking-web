import { Component, OnInit } from '@angular/core';
import { UsersStore, User } from './services/users.store';
import { CommonModule } from '@angular/common';
import { UserSidenavComponent } from "./components/user-sidenav/user-sidenav.component";

@Component({
  standalone: true,
  imports: [CommonModule, UserSidenavComponent],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users$!: any;
  
  viewMode: 'cards' | 'table' = 'cards';
  
  sidenavOpen = false;
  selectedUser: User | null = null;
  
  constructor(private store: UsersStore) {
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
    this.sidenavOpen = true;
  }

  openEdit(user: User) {
    this.selectedUser = user;
    this.sidenavOpen = true;
  }

  closeSidenav() {
    this.sidenavOpen = false;
  }
}