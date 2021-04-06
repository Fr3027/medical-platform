import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { CartItemService } from 'app/entities/cart-item/cart-item.service';
import { ShoppingCartService } from 'app/entities/shopping-cart/shopping-cart.service';
import { CartItem, ICartItem } from 'app/shared/model/cart-item.model';
import { ShoppingCart } from 'app/shared/model/shopping-cart.model';
import * as moment from 'moment';
import { JhiDataUtils } from 'ng-jhipster';

import { IProduct } from '../shared/model/product.model';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | undefined = undefined;
  quantity = 1;
  isSaving = false;
  constructor(
    protected dataUtils: JhiDataUtils,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private cartItemService: CartItemService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => (this.product = product));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }

  addToCart(): void {
    this.accountService.identity().subscribe(account => {
      if (!account) {
        return;
      }
      const cartItem: ICartItem = {
        ...new CartItem(),
        quantity: this.quantity,
        placeDate: moment(),
        product: this.product,
        cart: { ...new ShoppingCart(), id: account.id },
      };
      this.cartItemService.create(cartItem).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    });
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
