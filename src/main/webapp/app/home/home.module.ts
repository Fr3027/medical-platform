import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ProductDetailComponent } from '../home/product-detail.component';

@NgModule({
  imports: [DemoSharedModule, RouterModule.forChild(HOME_ROUTE)],
  declarations: [HomeComponent, ProductDetailComponent],
})
export class DemoHomeModule {}
