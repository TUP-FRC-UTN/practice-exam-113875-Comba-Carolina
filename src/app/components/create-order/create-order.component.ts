import { Component } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {

  form: FormGroup = new FormGroup({
    nombre: new FormGroup("", [Validators.required, Validators.minLength(3)]),
    email: new FormGroup("", [Validators.required, Validators.email]),
    productos: new FormArray([]),
  });

  get productos() {
    return this.form.controls["productos"] as FormArray;
  }

  quitarProducto(index: number) {
    this.productos.removeAt(index);
  }

  agregarProducto() {
    this.productos.push(new FormGroup({
      nombre: new FormGroup("", Validators.required),
      cantidad: new FormGroup("", Validators.required),
      precio: new FormGroup("", Validators.required),
      stock: new FormGroup("", Validators.required),
    }));
  }

}
