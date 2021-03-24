import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDeleteDialogComponent } from './shopping-cart-delete-dialog.component';

@Component({
  selector: 'jhi-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  shoppingCarts?: IShoppingCart[];
  eventSubscriber?: Subscription;

  constructor(
    protected shoppingCartService: ShoppingCartService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.shoppingCartService.query().subscribe((res: HttpResponse<IShoppingCart[]>) => (this.shoppingCarts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShoppingCarts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShoppingCart): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShoppingCarts(): void {
    this.eventSubscriber = this.eventManager.subscribe('shoppingCartListModification', () => this.loadAll());
  }

  delete(shoppingCart: IShoppingCart): void {
    const modalRef = this.modalService.open(ShoppingCartDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shoppingCart = shoppingCart;
  }
}
