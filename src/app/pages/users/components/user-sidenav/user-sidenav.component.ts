import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersStore } from '../../../../services/users/users.store';
import { UsersService } from '../../../../services/users/users.service';
import { User } from '../../../../models/user.model';
import { UiService } from '../../../../core/services/ui.service';

@Component({
  selector: 'app-user-sidenav',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-sidenav.component.html',
})
export class UserSidenavComponent {
  // model: User;
  form!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<string>;
    // status: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private store: UsersStore,
    // private users_services: UsersService,
    @Inject('SIDENAV_DATA') public user: User | null, // 🔥 DATA INYECTADA DESDE EL SIDENAV GLOBAL
    private ui: UiService, // 🔥 control global del sidenav
  ) {
    // 🔥 IMPORTANTE: inicializar aquí (NO en ngOnChanges)
    // this.model = this.user ? { ...this.user } : this.emptyUser();

    this.form = this.fb.nonNullable.group({
      name: ['', Validators.required], // obligatorio
      email: ['', [Validators.required, Validators.email]], // email válido
      role: ['Operador', Validators.required]
      // status: ['activo'],
    });

    if (user) {
      this.form.patchValue(user);
    }
  }

  emptyUser(): User {
    return {
      id: Date.now(),
      name: '',
      email: '',
      role: 'Operador',
      status: 1,
    };
  }

  save() {
    console.log('this.form.invalid: ', this.form.invalid);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value as User;
    console.log('data: ', data);

    console.log('this.user: ', this.user);

    if (this.user) {
      this.store.updateUser(data);
    } else {
      // this.store.addUser(data);
      this.store.addUser(data).subscribe({
        next: () => {
          this.ui.close(); // ✅ solo cierra si fue exitoso
        },
        error: () => {
          // ❌ no cerramos — el notify.error() del store ya mostró el snackbar
        },
      });
    }

    // this.ui.close();
  }

  cancel() {
    this.ui.close(); // 🔥 cerrar sidenav global
  }
}
