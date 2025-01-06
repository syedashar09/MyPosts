import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangerService {
  private isDarModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode = this.isDarModeSubject.asObservable();
  setDarkMode(isDarkMode: boolean): void {
    this.isDarModeSubject.next(isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));

    // Update global body class for theme
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  getDarkMode(): boolean {
    return this.isDarModeSubject.value;
  }
}
