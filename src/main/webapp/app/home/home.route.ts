import { Routes } from '@angular/router';
import { ProductResolve } from 'app/entities/product/product.route';
import { Authority } from 'app/shared/constants/authority.constants';

import { HomeComponent } from './home.component';
import { ProductDetailComponent } from './product-detail.component';

export const HOME_ROUTE: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authorities: [],
      pageTitle: 'home.title',
      defaultSort: 'id,asc',
    },
  },
  {
    path: 'home/product/:id/view',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.product.home.title',
    },
  },
];
