import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { IProducts } from '../../../core/interfaces/http';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/service/cart.service';
import { NotifecationsService } from '../../../core/service/notifecations.service';
import { EmptyComponent } from "../../empty/empty.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink, EmptyComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({required: true}) isSmallCard: boolean= false;
  @Input({required:true}) products!: IProducts[];
  @Input() searchKey: string = '';

  isAddedToCart: boolean= false;

constructor(
  private _cartService: CartService,
) {};

  addToCart(product: IProducts) {
    this._cartService.addToCart(product)
  }
}
