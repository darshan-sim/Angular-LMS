import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cart-add-button',
  imports: [],
  templateUrl: './cart-add-button.component.html',
  styleUrl: './cart-add-button.component.css'
})
export class CartAddButtonComponent {
  productId = input.required()
  quantity = input(0)

  added = output<number>()
  removed = output<number>()

  onProductAdd(){
    
  }

  onProductRemove(){

  }
}
