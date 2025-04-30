import { Component } from '@angular/core';
import { IProducts } from '../../core/interfaces/http';
import { ProductsService } from '../../core/service/products.service';
import { CardComponent } from "../../shared/card/card/card.component";
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchNamePipe } from '../../core/pipes/search-name.pipe';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardComponent,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    SearchNamePipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private _productsService: ProductsService,){};
  allProducts: IProducts[]= [];
  searchKey: string= '';

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() :void {
    this._productsService.allProducts().subscribe((next)=>
      this.allProducts= next )
  }
}
