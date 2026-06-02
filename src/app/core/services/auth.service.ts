import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private user: User | null = null;

  // 🔐 LOGIN SIMULADO (luego lo conectas a API)
  login(username: string, password: string): boolean {

    // Simulación
    if (username === 'admin') {
      this.user = { id: 1, name: 'Admin', role: 'admin' };
      localStorage.setItem('token', 'fake-jwt');
      localStorage.setItem('user', JSON.stringify(this.user));
      return true;
    }

    if (username === 'user') {
      this.user = { id: 2, name: 'User', role: 'user' };
      localStorage.setItem('token', 'fake-jwt');
      localStorage.setItem('user', JSON.stringify(this.user));
      return true;
    }

    return false;
  }

  logout() {
    localStorage.clear();
    this.user = null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): User | null {
    if (this.user) return this.user;

    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
      return this.user;
    }

    return null;
  }

  getRole(): string | null {
    return this.getUser()?.role || null;
  }
}