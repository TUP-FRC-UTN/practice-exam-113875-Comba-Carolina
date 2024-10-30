import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Producto } from '../../models/producto';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit {
  private productService = inject(ProductsService);
  productos: Producto[] = [];

  ngOnInit(): void {
    this.productService.getProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  form: FormGroup = new FormGroup({
    customerName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    products: new FormArray([]),
  });

  get products() {
    return this.form.get('products') as FormArray;
  }

  quitarProducto(index: number) {
    this.products.removeAt(index);
  }

  agregarProducto() {
    const productGroup = new FormGroup({
      productId: new FormControl(''),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      stock: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      price: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
    });
    this.products.push(productGroup);
  }

  onProductSelect(index: number) {
    const productGroup = this.products.at(index) as FormGroup;
    const selectedProductId = productGroup.get('productId')?.value;
    const selectedProduct = this.productos.find(p => p.id === selectedProductId);

    if (selectedProduct) {
      productGroup.patchValue({
        price: selectedProduct.price,
        stock: selectedProduct.stock,
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
  
}
