import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { CardComponent } from "../../shared/card/card/card.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent {
  images: any[] | undefined;

  ngOnInit() {
      this.images = [
        {
          itemImageSrc: './assets/product-1.jpg',
          alt: 'Description for product 1',
          title: 'product 1'
      },
        {
          itemImageSrc: './assets/product-2.jpg',
          alt: 'Description for product 2',
          title: 'product 2'
      },
        {
          itemImageSrc: './assets/product-3.jpg',
          alt: 'Description for product 3',
          title: 'product 3'
      },
        {
          itemImageSrc: './assets/product-4.jpg',
          alt: 'Description for product 4',
          title: 'product 4'
      },
      ]
  }

}
