import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User, UsersStore } from '../../services/users.store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-sidenav',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-sidenav.component.html'
})
export class UserSidenavComponent {

  @Input() open = false;
  @Input() user: User | null = null;

  @Output() close = new EventEmitter();

  model: User = this.emptyUser();

  constructor(private store: UsersStore) {}

  ngOnChanges() {
    this.model = this.user ? { ...this.user } : this.emptyUser();
  }

  emptyUser(): User {
    return {
      id: Date.now(),
      name: '',
      email: '',
      role: 'Operador',
      status: 'activo'
    };
  }

  save() {
    if (this.user) {
      this.store.updateUser(this.model);
    } else {
      this.store.addUser(this.model);
    }
    this.close.emit();
  }
}