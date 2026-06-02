import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  toggleTheme() {
    document.body.classList.toggle('dark');
  }

  setDark() {
    document.body.classList.add('dark');
  }

  setLight() {
    document.body.classList.remove('dark');
  }
}