import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketRoutingModule } from './basket-routing.module';
import { OrderTotalsComponent } from '../shared/components/order-totals/order-totals.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, BasketRoutingModule, OrderTotalsComponent],
})
export class BasketModule {}
