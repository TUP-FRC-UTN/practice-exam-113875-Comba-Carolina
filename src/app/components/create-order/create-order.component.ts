import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent {
  id: string = '';
  form: FormGroup = new FormGroup({
    customerName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    products: new FormArray([]),
  });
  total: number = 0;
  orderCode: string = '';
  timestamp: number = 0;

  get products() {
    return this.form.controls['products'] as FormArray;
  }

  quitarProducto(index: number) {
    this.products.removeAt(index);
  }

  productId: number = 0;
  agregarProducto() {
    this.products.push(
      new FormGroup({
        quantity: new FormControl('', Validators.required),
        stock: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
      })
    );
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
