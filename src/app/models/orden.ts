import { ProductoDto } from './productoDto';

export interface Orden {
  id: string;
  customerName: string;
  email: string;
  products: ProductoDto[];
  total: number;
  orderCode: string;
  timestamp: string;
}
