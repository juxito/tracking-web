import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  toggleDark() {
    document.body.classList.toggle('dark');
  }
}