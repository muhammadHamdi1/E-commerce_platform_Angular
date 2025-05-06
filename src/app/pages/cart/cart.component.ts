import { Component } from '@angular/core';
import { IProducts } from '../../core/interfaces/http';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  allCartProducts: IProducts[] = [];
  // isHart: boolean= false

  ngOnInit() {
    if (localStorage.getItem('cartState') !== null) {
      this.allCartProducts = JSON.parse(
        localStorage.getItem('cartState') || ''
      );
    }
  }
  clearCart(): void{
    localStorage.removeItem('cartState');
    this.allCartProducts= [];
  }
}
