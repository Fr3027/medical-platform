import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  templateUrl: './shopping-cart-delete-dialog.component.html',
})
export class ShoppingCartDeleteDialogComponent {
  shoppingCart?: IShoppingCart;

  constructor(
    protected shoppingCartService: ShoppingCartService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shoppingCartService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shoppingCartListModification');
      this.activeModal.close();
    });
  }
}
