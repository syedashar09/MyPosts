import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeChangerService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  theme$ = this.isDarkMode.asObservable();
  private renderer: Renderer2;
  private currentTheme: string;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.currentTheme = this.loadTheme();
    this.applyTheme(this.currentTheme);
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
  applyTheme(theme: string): void {
    const previousTheme = this.currentTheme;
    this.renderer.removeClass(document.body, previousTheme);
    this.renderer.addClass(document.body, theme);
    this.currentTheme = theme;
    this.saveTheme(theme);
  }

  private saveTheme(theme: string): void {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('could not save theme to localStorage:', e);
    }
  }
  private loadTheme(): string {
    return localStorage.getItem('theme') || 'light-theme';
  }
}
