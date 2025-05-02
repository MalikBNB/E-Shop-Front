import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './components/pager/pager.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagerComponent],
  exports: [PagerComponent],
})
export class SharedModule {}
