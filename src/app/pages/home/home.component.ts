import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from '../../shared/card/card/card.component';
import { UserDataService } from '../../core/service/user-data.service';
import { IProducts } from '../../core/interfaces/http';
import { PopularPipe } from '../../core/pipes/popular.pipe';
import { ProductsService } from '../../core/service/products.service';
import { CartService } from '../../core/service/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent, PopularPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  images: any[] | undefined;
  smallProducts!: IProducts[];
  popularProducts!: IProducts[];

  constructor(
    private _productsService: ProductsService,
    private _cartService: CartService
  ) {}
  ngOnInit() {
    this.images = [
      {
        itemImageSrc: './assets/product-1.jpg',
        alt: 'Description for product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: './assets/product-2.jpg',
        alt: 'Description for product 2',
        title: 'product 2',
      },
      {
        itemImageSrc: './assets/product-3.jpg',
        alt: 'Description for product 3',
        title: 'product 3',
      },
      {
        itemImageSrc: './assets/product-4.jpg',
        alt: 'Description for product 4',
        title: 'product 4',
      },
    ];


    this.getAllProducts();
  }

  getAllProducts(): void {
    this._productsService.allProducts().subscribe((response: any) => {
      this.smallProducts = response.products.slice(0, 4);
      this.popularProducts = response.products.map((product: IProducts) => {
        return {
          ...product,
          isAddedToCart: this._cartService.isAddedToCart(product) || false,
        };
      });
    });
  }

}
