import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICartItem } from 'app/shared/model/cart-item.model';
import { CartItemService } from './cart-item.service';
import { CartItemDeleteDialogComponent } from './cart-item-delete-dialog.component';

@Component({
  selector: 'jhi-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent implements OnInit, OnDestroy {
  cartItems?: ICartItem[];
  eventSubscriber?: Subscription;

  constructor(protected cartItemService: CartItemService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cartItemService.query().subscribe((res: HttpResponse<ICartItem[]>) => (this.cartItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCartItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICartItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCartItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('cartItemListModification', () => this.loadAll());
  }

  delete(cartItem: ICartItem): void {
    const modalRef = this.modalService.open(CartItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cartItem = cartItem;
  }
}
