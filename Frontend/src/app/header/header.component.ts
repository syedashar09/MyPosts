import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userIsAuthenticated: boolean = false;
  private authListnerSubs: Subscription;
  isNavbarHidden = false;
  lastScrollTop = 0;
  scrollThreshold = 100;
  isDarkMode = false;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScroll = window.scrollY;

    if (currentScroll > this.scrollThreshold) {
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        this.isNavbarHidden = true;
      } else {
        // Scrolling up
        this.isNavbarHidden = false;
      }
    } else {
      // Ensure navbar is visible at the top
      this.isNavbarHidden = false;
    }

    this.lastScrollTop = currentScroll;
  }

  ngOnDestroy(): void {
    this.authListnerSubs.unsubscribe();
  }

  logOut() {
    this.authService.logOutUser();
    console.log('User logOut');
    this.router.navigate(['/']);
  }
  toggleTheme(isDark: boolean): void {
    this.isDarkMode = isDark;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
}
