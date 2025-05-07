import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderTotalsComponent } from "../shared/components/order-totals/order-totals.component";

@Component({
  selector: 'app-basket',
  imports: [AsyncPipe, NgIf, NgFor, RouterLink, CurrencyPipe, OrderTotalsComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  basket$: Observable<IBasket | null>

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item)
  }

  incrementItemQty(item: IBasketItem) {
    this.basketService.incrementItemQty(item)
  }

  decrementItemQty(item: IBasketItem) {
    this.basketService.decrementItemQty(item)
  }
}
