import { signal } from "@angular/core";
import { productsData } from "../types/product";

export class ProductStore {
  products = signal(productsData).asReadonly();
}