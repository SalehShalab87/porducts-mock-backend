import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private cartService = inject(CartService);
  totalPrice: number = 0;
  cartItems = this.cartService.cartItems$;

  getTotalPrice(cartItems: CartItem[] | null | undefined): number {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(productId:number){
    this.cartService.increaseQuantity(productId);
  }
    
  decreaseQuantity(productId:number){
    this.cartService.decreaseQuantity(productId);
  }

}
