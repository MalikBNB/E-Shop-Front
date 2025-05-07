import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { Basket, IBasket } from '../../shared/models/basket';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, AsyncPipe, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket | null>;

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }
}
