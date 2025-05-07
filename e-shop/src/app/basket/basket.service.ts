import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments.prod';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;

  private basketSource = new BehaviorSubject<IBasket | null>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get<IBasket>(`${this.baseUrl}baskets?id=${id}`).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'baskets', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, qty = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, qty);
    let basket = this.getCurrentBasketValue();
    if (basket === null) {
      basket = this.createBasket();
    }

    basket.basketItems = this.addOrUpdateItem(
      basket.basketItems,
      itemToAdd,
      qty
    );

    this.setBasket(basket);
  }

  incrementItemQty(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const itemIndex = basket?.basketItems.findIndex((i) => i.id == item.id);

    if (basket !== null && itemIndex !== undefined) {
      basket.basketItems[itemIndex].qty++;
      this.setBasket(basket);
    }
  }

  decrementItemQty(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const itemIndex = basket?.basketItems.findIndex((i) => i.id == item.id);

    if (basket !== null && itemIndex !== undefined) {
      if (basket.basketItems[itemIndex].qty > 1) {
        basket.basketItems[itemIndex].qty--;
        this.setBasket(basket);
      } else this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();

    if (basket !== null && basket.basketItems.some((i) => i.id === item.id)) {
      basket.basketItems = basket.basketItems.filter((i) => i.id !== item.id);

      if (basket.basketItems.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket.id);
    }
  }

  deleteBasket(basketId: string) {
    return this.http.delete(this.baseUrl + 'baskets?id=' + basketId).subscribe(
      () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);

        localStorage.removeItem('basket_id');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private mapProductItemToBasketItem(item: Product, qty: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      qty: qty,
      productBrand: item.productBrand,
      productType: item.productType,
    };
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);

    return basket;
  }

  private addOrUpdateItem(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    qty: number
  ): IBasketItem[] {
    const itemIndex = basketItems.findIndex((i) => i.id === itemToAdd.id);

    if (itemIndex === -1) {
      itemToAdd.qty = qty;
      basketItems.push(itemToAdd);
    } else {
      basketItems[itemIndex].qty += qty;
    }

    return basketItems;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;

    let subTotal = 0;
    if (basket)
      subTotal = basket.basketItems.reduce(
        (crnt, nxt) => nxt.price * nxt.qty + crnt,
        0
      );

    const total = subTotal + shipping;

    this.basketTotalSource.next({ shipping, total, subTotal });
  }
}
