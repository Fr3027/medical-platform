import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.DemoProductModule),
      },
      {
        path: 'product-category',
        loadChildren: () => import('./product-category/product-category.module').then(m => m.DemoProductCategoryModule),
      },
      {
        path: 'customer-details',
        loadChildren: () => import('./customer-details/customer-details.module').then(m => m.DemoCustomerDetailsModule),
      },
      {
        path: 'shopping-cart',
        loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.DemoShoppingCartModule),
      },
      {
        path: 'product-order',
        loadChildren: () => import('./product-order/product-order.module').then(m => m.DemoProductOrderModule),
      },
      {
        path: 'advisory',
        loadChildren: () => import('./advisory/advisory.module').then(m => m.DemoAdvisoryModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class DemoEntityModule {}
