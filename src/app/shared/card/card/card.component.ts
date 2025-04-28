import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProducts } from '../../../core/interfaces/http';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/service/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({required: true}) isSmallCard: boolean= false;
  @Input({required:true}) products!: IProducts[];
  isAddedToCart: boolean= false

constructor(
  private _cartService: CartService,
) {};

  addToCart(productId: string): void {
    const userId= localStorage.getItem('token')?? '';
    this._cartService.addToCart({userId, productId}).subscribe((next)=> {
      console.log(next);
      // get count of products in cart
      this._cartService.countOfCart.next(next.cart.length)
      this.isAddedToCart= true;

      // store product status in the shopping cart
      // cartState = {key= product._id: value= boolean}
      const storedCart= localStorage.getItem('cartState');
      const cartState= storedCart? JSON.parse(storedCart): {};

      cartState[productId]= true;
      localStorage.setItem('cartState', JSON.stringify(cartState));
    })
  }
}
