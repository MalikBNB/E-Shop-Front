import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagerComponent, CarouselModule, OrderTotalsComponent],
  exports: [PagerComponent, CarouselModule, OrderTotalsComponent],
})
export class SharedModule {}
