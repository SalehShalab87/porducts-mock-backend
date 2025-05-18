import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm! : FormGroup;
  private fb = inject(FormBuilder);
  private productService = inject(ProductsService);
  private router = inject(Router);

  ngOnInit(){
    this.inilializeForm();
  }

  inilializeForm(){
    this.productForm = this.fb.group({
      name:['',Validators.required],
      price:['',Validators.required],
      imageUrl:['',Validators.required],
    })
  }

  onSubmit(){
    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.productForm.reset();
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    })
  }

}
