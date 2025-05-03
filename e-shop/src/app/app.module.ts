import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideHotToastConfig({
      position: 'bottom-right',
    }),
  ],
})
export class AppModule {}
