import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { CoreModule } from './core/core.module';
import { ShopComponent } from './shop/shop.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';
import { error } from 'console';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, NgFor, ShopComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'e-shop';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token)?.subscribe(
      () => {
        console.log('User loaded');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(
        () => {
          console.log('Initialized basket');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
