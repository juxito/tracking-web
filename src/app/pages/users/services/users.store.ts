import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user.model';

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
//   status: 'activo' | 'inactivo';
// }

@Injectable({ providedIn: 'root' })
export class UsersStore {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  private loaded = false;

  loadUsers() {
    if (this.loaded) return;

    // 🔥 simulado (luego API)
    const mock: User[] = [
      { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'activo' },
      { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Operador', status: 'activo' }
    ];

    this.usersSubject.next(mock);
    this.loaded = true;
  }

  addUser(user: User) {
    const current = this.usersSubject.value;
    this.usersSubject.next([...current, user]);
  }

  updateUser(user: User) {
    const updated = this.usersSubject.value.map(u =>
      u.id === user.id ? user : u
    );
    this.usersSubject.next(updated);
  }
}