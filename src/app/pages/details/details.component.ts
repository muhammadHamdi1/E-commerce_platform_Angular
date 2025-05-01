import { Component } from '@angular/core';
import { ProductsService } from '../../core/service/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProducts } from '../../core/interfaces/http';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/service/cart.service';
import { NotifecationsService } from '../../core/service/notifecations.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  id: string= '';
  productDetails!: IProducts;
  isAddedToCart: boolean= false
  constructor(
    private _details: ProductsService,
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,
    private _notifecationsService: NotifecationsService
  ){}


  ngOnInit(){
    this._activatedRoute.paramMap.subscribe(
      (next: any) => (this.id = next.params['id']) );

    this.displayDetails();
  }

  displayDetails(): void {
    this._details.getDetails(this.id)
    .subscribe((next)=> (this.productDetails= next.product));
  };

  addToCart(productId: string): void {
    const userId= localStorage.getItem('token')?? '';
    this._cartService.addToCart({userId, productId}).subscribe((next)=> {
      this._notifecationsService.showSuccess('success', next.message);
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
};
