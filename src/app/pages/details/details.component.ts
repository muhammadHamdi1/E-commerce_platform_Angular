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

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cartService: CartService,

  ){};

  id: string= '';
  productDetails!: IProducts;
  isAddedToCart: boolean= false
  isHart: boolean = false

  ngOnInit(){
    this._activatedRoute.paramMap.subscribe(
      (next: any) => (this.id = next.params['id']) );

    this.displayDetails();
  };

  displayDetails(): void {
    // get Data into resolve
    this._activatedRoute.data.subscribe((data: any)=> {
      this.productDetails = {
        ...data.details.product,
        isAddedToCart: this._cartService.isAddedToCart(data.details.product)
      }
    });
  };

  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
};
