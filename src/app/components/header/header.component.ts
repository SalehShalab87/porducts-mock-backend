import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, CommonModule,RouterLink,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  authService = inject(AuthService);

  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUserName$ = this.authService.currentUserName$;

  cureentLanguage!: string;

  ngOnInit() {
    this.loadCureentLanguage();
  }

  goBackToHome() {
    this.router.navigateByUrl('');
  }

  loadCureentLanguage() {
    this.cureentLanguage = localStorage.getItem('lang') || 'en';
  }

  goToLoginPage() {
    this.router.navigateByUrl('/sign-in');
  }

  goToCarPage(){
    this.router.navigateByUrl('/cart');
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/');
  }

}
