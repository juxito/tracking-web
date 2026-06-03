import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../../services/users.store';
import { User } from '../../../../models/user.model';
import { UiService } from '../../../../core/services/ui.service';

@Component({
  selector: 'app-user-sidenav',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-sidenav.component.html'
})
export class UserSidenavComponent {

  model: User;

  constructor(
    @Inject('SIDENAV_DATA') public user: User | null,
    private store: UsersStore,
    private ui: UiService // 🔥 control global del sidenav
  ) {
    // 🔥 IMPORTANTE: inicializar aquí (NO en ngOnChanges)
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

    this.ui.close(); // 🔥 cerrar sidenav global
  }

  cancel() {
    this.ui.close(); // 🔥 cerrar sidenav global
  }
}