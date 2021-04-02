import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICartItem, CartItem } from 'app/shared/model/cart-item.model';
import { CartItemService } from './cart-item.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { ShoppingCartService } from 'app/entities/shopping-cart/shopping-cart.service';

type SelectableEntity = IProduct | IShoppingCart;

@Component({
  selector: 'jhi-cart-item-update',
  templateUrl: './cart-item-update.component.html',
})
export class CartItemUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];
  shoppingcarts: IShoppingCart[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    placeDate: [],
    product: [],
    cart: [null, Validators.required],
  });

  constructor(
    protected cartItemService: CartItemService,
    protected productService: ProductService,
    protected shoppingCartService: ShoppingCartService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cartItem }) => {
      if (!cartItem.id) {
        const today = moment().startOf('day');
        cartItem.placeDate = today;
      }

      this.updateForm(cartItem);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));

      this.shoppingCartService.query().subscribe((res: HttpResponse<IShoppingCart[]>) => (this.shoppingcarts = res.body || []));
    });
  }

  updateForm(cartItem: ICartItem): void {
    this.editForm.patchValue({
      id: cartItem.id,
      quantity: cartItem.quantity,
      placeDate: cartItem.placeDate ? cartItem.placeDate.format(DATE_TIME_FORMAT) : null,
      product: cartItem.product,
      cart: cartItem.cart,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cartItem = this.createFromForm();
    if (cartItem.id !== undefined) {
      this.subscribeToSaveResponse(this.cartItemService.update(cartItem));
    } else {
      this.subscribeToSaveResponse(this.cartItemService.create(cartItem));
    }
  }

  private createFromForm(): ICartItem {
    return {
      ...new CartItem(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      placeDate: this.editForm.get(['placeDate'])!.value ? moment(this.editForm.get(['placeDate'])!.value, DATE_TIME_FORMAT) : undefined,
      product: this.editForm.get(['product'])!.value,
      cart: this.editForm.get(['cart'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICartItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
