import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartItems());
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartIetemsCountSubject$ = new BehaviorSubject<number>(this.getItemsCount());
  cartItemsCount$ = this.cartIetemsCountSubject$.asObservable();
  

  // Get current cart items
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  // Load cart items from local storage
  loadCartItems(): CartItem[] {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  // Get total item count in the cart
  getItemsCount(): number {
    const cartItems = this.getCartItems();
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  // Add product to cart
  addToCart(product: Product): void {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity;
    } else {
      // Create a new cart item
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        unitPrice: product.price,
        quantity: 1,
        totalPrice: product.price,
      };
      cartItems.push(newItem);
    }

    // Update the cart
    this.cartItemsSubject.next(cartItems);
    // Save to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Update the cart items count
    this.cartIetemsCountSubject$.next(this.getItemsCount());
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    const updatedCart = this.getCartItems().filter((item) => item.id !== productId);
    this.cartItemsSubject.next(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    this.cartIetemsCountSubject$.next(this.getItemsCount());
  }

  // Increase quantity of a product in the cart
  increaseQuantity(productId: number): void {
    const cartItems = this.getCartItems();
    const item = cartItems.find((item) => item.id === productId);

    if (item) {
      item.quantity += 1;
      item.totalPrice = item.unitPrice * item.quantity;
      this.cartItemsSubject.next(cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cartIetemsCountSubject$.next(this.getItemsCount());
    }
  }

  // Decrease quantity of a product in the cart
  decreaseQuantity(productId: number): void {
    const cartItems = this.getCartItems();
    const item = cartItems.find((item) => item.id === productId);

    if (item !== undefined && item.quantity > 1) {
      item.quantity -= 1;
      item.totalPrice = item.unitPrice * item.quantity;
      this.cartItemsSubject.next(cartItems);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cartIetemsCountSubject$.next(this.getItemsCount());
      
    } else if (item) {
      this.removeFromCart(productId);
    }
  }
}
