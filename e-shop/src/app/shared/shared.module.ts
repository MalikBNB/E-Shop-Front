import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagerComponent, CarouselModule],
  exports: [PagerComponent, CarouselModule],
})
export class SharedModule {}
