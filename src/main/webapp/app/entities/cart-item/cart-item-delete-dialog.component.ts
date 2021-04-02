import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICartItem } from 'app/shared/model/cart-item.model';
import { CartItemService } from './cart-item.service';

@Component({
  templateUrl: './cart-item-delete-dialog.component.html',
})
export class CartItemDeleteDialogComponent {
  cartItem?: ICartItem;

  constructor(protected cartItemService: CartItemService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cartItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cartItemListModification');
      this.activeModal.close();
    });
  }
}
