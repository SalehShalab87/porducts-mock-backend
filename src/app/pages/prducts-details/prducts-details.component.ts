import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { LoaderComponent } from "../../components/loader/loader.component";
import { TranslatePipe } from '../../i18n/translate.pipe';

@Component({
  selector: 'app-prducts-details',
  imports: [CurrencyPipe, LoaderComponent,TranslatePipe],
  templateUrl: './prducts-details.component.html',
  styleUrl: './prducts-details.component.scss',
})
export class ProductsDetailsComponent {
  private productId!: number;
  private productsService = inject(ProductsService);
  private ActiveRoute = inject(ActivatedRoute);
  private router = inject(Router);
  product!:Product;
  isLoading: boolean = true;

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
        console.error('Error loading product details', err);
      },
    });
  }

  goBackToProductsPage(){
    this.router.navigateByUrl('/');
  }
  goToCheckoutPage(){
    this.router.navigateByUrl('/checkout');
  }
}
