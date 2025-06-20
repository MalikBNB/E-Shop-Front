import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagerComponent,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    OrderTotalsComponent,
    ReactiveFormsModule,
  ],
  exports: [
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
  ],
})
export class SharedModule {}
