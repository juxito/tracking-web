import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';

// import { UsersStore } from '../../services/users/users.store';
import { UsersStore } from '../../services/users/users.store';
import { UserSidenavComponent } from './components/user-sidenav/user-sidenav.component';
import { UiService } from '../../core/services/ui.service';
import { User } from '../../services/users/users.service';
import { RetryService } from '../../core/services/retry.service';

@Component({
  standalone: true,
  imports: [CommonModule, MatSidenavModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  @ViewChild('globalSidenav') sidenav!: MatSidenav;

  public store = inject(UsersStore);   // ← se resuelve antes que las props
  public ui = inject(UiService);
  public retryService = inject(RetryService); 

  // users$!: any;
  // users$!: Observable<User[]>;
  users = this.store.users; // 👈 señal reactiva
  
  viewMode: 'cards' | 'table' = 'cards';
  sidenavOpen = false;
  selectedUser: User | null = null;

  // constructor(
  //   private store: UsersStore,
  //   public ui: UiService,
  // ) {
  //   // this.users$ = this.store.users$;
  // }

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
