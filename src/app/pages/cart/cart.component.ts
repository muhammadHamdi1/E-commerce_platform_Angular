import { Component } from '@angular/core';
import { IProducts } from '../../core/interfaces/http';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  allCartProducts: IProducts[] = [];

  ngOnInit() {
    if (localStorage.getItem('cartState') !== null) {
      this.allCartProducts = JSON.parse(
        localStorage.getItem('cartState') || ''
      );
    }
  }

  clearCart(): void{
    localStorage.removeItem('cartState');
    window.location.reload()
    this.allCartProducts= [];
  }
}
