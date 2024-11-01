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

  productSelected: FormGroup = new FormGroup({
    name: new FormControl(),
    quantity: new FormControl(),
    price: new FormControl(),
    stock: new FormControl(),
  });

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
    return this.form.controls['products'] as FormArray;
  }

  quitarProducto(index: number) {
    this.products.removeAt(index);
  }

  agregarProducto() {
    const productGroup = new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      price: new FormControl({ value: 0, disabled: true }),
      stock: new FormControl({ value: 0, disabled: true }),
    });
  
    this.products.push(productGroup);
  }
  
  onProductSelect(productGroup: any) {
    const selectedProductName = productGroup.controls['name'].value;
    const selectedProduct = this.productos.find(p => p.id === selectedProductName);
    
    if (selectedProduct) {
      productGroup.controls['price'].setValue(selectedProduct.price);
      productGroup.controls['stock'].setValue(selectedProduct.stock);
    }
  }

  getProductDetails(productId: number) {
    const producto = this.productos.find(p => p.id === productId);
    return producto || null;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
  
}
