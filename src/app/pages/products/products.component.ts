import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [LoaderComponent,CurrencyPipe, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  productsList!:Product[]
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private cartService = inject(CartService);

  ngOnInit() {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.productsList = products;
      },
      error: (err) => {
        console.error('Error loading products', err);
      }
    })
  }

  goToProductDetails(productId: number) {
    this.router.navigateByUrl(`/products/${productId}`);
  }

  addProductToCart(product: Product) {
    this.cartService.addToCart(product);
    this.router.navigateByUrl('/cart');
  }

}
