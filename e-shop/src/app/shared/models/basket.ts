import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  basketItems: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  qty: number;
  pictureUrl: string;
  productBrand: string;
  productType: string;
}

export class Basket implements IBasket {
  id = uuidv4();
  basketItems: IBasketItem[] = [];
}

export interface IBasketTotals {
  shipping: number;
  subTotal: number;
  total: number;
}
