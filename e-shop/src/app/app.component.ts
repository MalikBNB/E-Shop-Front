import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { CoreModule } from './core/core.module';
import { ShopComponent } from './shop/shop.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CoreModule,
    NgFor,
    ShopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'e-shop';
  constructor() {}

  ngOnInit(): void {}
}
