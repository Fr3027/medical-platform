import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemoSharedModule } from 'app/shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartDetailComponent } from './shopping-cart-detail.component';
import { ShoppingCartUpdateComponent } from './shopping-cart-update.component';
import { ShoppingCartDeleteDialogComponent } from './shopping-cart-delete-dialog.component';
import { shoppingCartRoute } from './shopping-cart.route';

@NgModule({
  imports: [DemoSharedModule, RouterModule.forChild(shoppingCartRoute)],
  declarations: [ShoppingCartComponent, ShoppingCartDetailComponent, ShoppingCartUpdateComponent, ShoppingCartDeleteDialogComponent],
  entryComponents: [ShoppingCartDeleteDialogComponent],
})
export class DemoShoppingCartModule {}
