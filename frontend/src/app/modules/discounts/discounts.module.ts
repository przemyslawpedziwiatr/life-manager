import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountPageComponent } from './components/discount-page/discount-page.component';
import { RouterModule, Routes } from '@angular/router';

export const discountsRoutes: Routes = [
  {
    path: 'discounts',
    component: DiscountPageComponent,
  }
];



@NgModule({
  declarations: [DiscountPageComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DiscountPageComponent
  ]
})
export class DiscountsModule { }
