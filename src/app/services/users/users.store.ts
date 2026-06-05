import { Injectable, signal } from '@angular/core';
import { UsersService } from './users.service';
import { User } from '../../models/user.model';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from '../../core/services/notification.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  // 🔥 estado reactivo
  private _users = signal<User[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  users = this._users.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  constructor(private api: UsersService, private notify: NotificationService) {}

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
        console.log('err: ', err);
        this.notify.error('Error cargando usuarios');
        this._error.set('Error cargando usuarios');
        this._loading.set(false);
      }
    });
  }

  // diferencia entre un observable y un Signal
  addUser(user: User): Observable<User> {  // 👈 devuelve el observable
    return this.api.createUser(user).pipe(
      tap((res: any) => {
        this._users.update((users) => [...users, res.data]);
        this.notify.success('Usuario creado correctamente');
        this._error.set(null);
      }),
      catchError((err) => {
        console.log('Error al crear usuario: ', err);
        this._error.set(err.message);
        this.notify.error(err.message);
        return throwError(() => err); // 👈 re-lanza para que el componente lo capture
      })
    );
  }
  // addUser(user: User) {
  //   this.api.createUser(user).subscribe({
  //     next: (newUser) => {
  //       this._users.update((users) => [...users, newUser]);

  //       // 🔥 NOTIFICACIÓN GLOBAL
  //       this.notify.success('Usuario creado correctamente');
        
  //       this._error.set(null); // limpiar error si fue exitoso
  //     },
  //     error: (err) => {
  //       // 🔥 ahora sí usamos el mensaje real
  //       console.log('Error al crear usuario: ', err);
  //       this._error.set(err.message);

  //       // 🔥 NOTIFICACIÓN GLOBAL
  //       this.notify.error(err.message);
  //     },
  //   });
  // }

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
