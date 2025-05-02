import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { IProducts } from '../interfaces/http';
import { NotifecationsService } from './notifecations.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private _httpClient: HttpClient,
    private _notifecationsService : NotifecationsService
  ) { };

  // countOfCart: BehaviorSubject<number>=  new BehaviorSubject<number>(0);

  // getCartCount(id: string): Observable<any> {
  //   return this._httpClient.get(`${baseUrl}/my-cart/${id}`);
  // };

  // addToCart(userData:{productId: string, userId: string} ): Observable<any> {
  //   return this._httpClient.post(`${baseUrl}/add-to-cart`, userData);
  // }

  // Update
  countOfCart: BehaviorSubject<number>=  new BehaviorSubject(
    (
      JSON.parse(localStorage.getItem('cartState') ?? '[]') as IProducts[]
    ).length
  ) ;

  addToCart(product: IProducts) {
    const storedCart= localStorage.getItem('cartState');
    const cart: IProducts[] = storedCart ? JSON.parse(storedCart) : [];

    if(!product.isAddedToCart) {
      product.isAddedToCart= true;
      cart.push(product);

      localStorage.setItem('cartState', JSON.stringify(cart));

      this._notifecationsService.showSuccess('Success','Item added to cart');
      this.countOfCart.next(cart.length);
    } else {
      this._notifecationsService.showWarn('Warning','This item is add');

    }
  };

  isAddedToCart(product: IProducts): boolean {
    const storedCart= localStorage.getItem('cartState');
    const cartState= storedCart ? JSON.parse(storedCart): [];

    const isAdded = cartState.some((item: IProducts)=> item.id === product.id)

    return isAdded;
  }
}
