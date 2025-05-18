import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [TranslatePipe, CommonModule,RouterLink,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cartService = inject(CartService)

  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUserName$ = this.authService.currentUserName$;
  cartItems$ = this.cartService.cartItems$;
  cartItemsCount$ = this.cartService.cartItemsCount$;
  isAdmin$ = this.authService.isAdmin$;
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

  goToAddProductPage(){
    this.router.navigateByUrl('/add-product');
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/');
  }

}
