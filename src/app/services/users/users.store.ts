import { Injectable, signal } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  // 🔥 estado reactivo
  private _users = signal<User[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  users = this._users.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  constructor(private api: UsersService) {}

  private usersSubject = new BehaviorSubject<User[]>([]);
  private loaded = false;

  loadUsers() {
    // if (this.loaded) return;

    // // 🔥 simulado (luego API)
    // const mock: User[] = [
    //   { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'activo' },

    //   { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Operador', status: 'activo' },
    // ];

    // this.usersSubject.next(mock);

    // this.loaded = true;



    this._loading.set(true);
    this._error.set(null);

    this.api.getUsers().subscribe({
      next: (data) => {
        this._users.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Error cargando usuarios');
        this._loading.set(false);
      }
    });
  }

  addUser(user: User) {
    this.api.createUser(user).subscribe({
      next: (newUser) => {
        this._users.update((users) => [...users, newUser]);
      },
      error: () => this._error.set('Error creando usuario'),
    });
  }

  updateUser(user: User) {
    // this.api.updateUser(user).subscribe({
    //   next: (updated) => {
    //     this._users.update(users =>
    //       users.map(u => u.id === updated.id ? updated : u)
    //     );
    //   },
    //   error: () => this._error.set('Error actualizando usuario')
    // });
  }

  deleteUser(id: number) {
    this.api.deleteUser(id).subscribe({
      next: () => {
        this._users.update((users) => users.filter((u) => u.id !== id));
      },
      error: () => this._error.set('Error eliminando usuario'),
    });
  }
}
