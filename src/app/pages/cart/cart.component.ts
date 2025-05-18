import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart.model';
import { Observable } from 'rxjs';
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService = inject(CartService);
  totalPrice: number = 0;
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  cartItemsCount$:Observable<number> = this.cartService.cartItemsCount$;

  getTotalPrice(cartItems: CartItem[] | null | undefined): number {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(productId:string){
    this.cartService.increaseQuantity(productId);
  }
    
  decreaseQuantity(productId:string){
    this.cartService.decreaseQuantity(productId);
  }
  
}
