import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

// Interfaz para definir la estructura del objeto (tipado estricto)
// export interface User {
//   id?: number;
//   name: string;
//   email: string;
//   role: string;
// }

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:8080/api/users'; // URL del Backend

  constructor(private http: HttpClient) { }

  // Obtener usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Guardar usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User) {
    // const updated = this.usersSubject.value.map(u =>
    //   u.id === user.id ? user : u
    // );
    // this.usersSubject.next(updated);
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

export type {
  User // URL del Backend
};
