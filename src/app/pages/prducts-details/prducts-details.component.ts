import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { TranslatePipe } from '../../i18n/translate.pipe';
import { AuthService } from '../../services/auth.service';
import { Message } from 'primeng/message';
import { NotFoundComponent } from "../not-found/not-found.component";
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-prducts-details',
  imports: [CurrencyPipe, LoaderComponent, TranslatePipe, CommonModule, Message, NotFoundComponent],
  templateUrl: './prducts-details.component.html',
  styleUrl: './prducts-details.component.scss',
})
export class ProductsDetailsComponent {
  private productId!: number;
  private productsService = inject(ProductsService);
  private ActiveRoute = inject(ActivatedRoute);
  private AuthServvice = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);
  product!:Product;
  isLoading: boolean = true;

  isLoggedIn$ = this.AuthServvice.isLoggedIn$;

  ngOnInit() {
    this.readProductId();
    this.loadProductById();
  }

  readProductId() {
    this.productId = Number(this.ActiveRoute.snapshot.paramMap.get('id'));
  }

  loadProductById() {
    this.productsService.getProductById(this.productId).subscribe({
      next: (productRespone) => {
        this.product= productRespone;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 404) {
          this.router.navigateByUrl('/not-found');
        }
        console.error('Error loading product details', err);
      },
    });
  }

 
  goToCartPage(){
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart');
  }
}
