import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICartItem } from 'app/shared/model/cart-item.model';

@Component({
  selector: 'jhi-cart-item-detail',
  templateUrl: './cart-item-detail.component.html',
})
export class CartItemDetailComponent implements OnInit {
  cartItem: ICartItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cartItem }) => (this.cartItem = cartItem));
  }

  previousState(): void {
    window.history.back();
  }
}
