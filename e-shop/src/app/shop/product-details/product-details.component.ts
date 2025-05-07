import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { error } from 'console';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  imports: [NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  productId: number;

  qauntity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.shopService.getProduct(this.productId).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.qauntity);
  }

  incrementQuantity() {
    this.qauntity++;
  }

  decrementQuantity() {
    if (this.qauntity > 1) this.qauntity--;
  }
}
