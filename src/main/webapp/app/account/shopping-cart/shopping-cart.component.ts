import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItemService } from 'app/entities/cart-item/cart-item.service';
import { ShoppingCartService } from 'app/entities/shopping-cart/shopping-cart.service';
import { CartItem, ICartItem } from 'app/shared/model/cart-item.model';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems?: ICartItem[];
  totalPrice = 0;
  constructor(
    protected shoppingCartService: ShoppingCartService,
    protected cartItemService: CartItemService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}
  loadAll(): void {
    this.cartItemService.query().subscribe((res: HttpResponse<CartItem[]>) => {
      this.cartItems = res.body || [];
      const reducer = (accumulator: number, currentValue: CartItem) => {
        const quantity = currentValue.quantity ?? 0;
        const price = currentValue?.product?.price ?? 0;
        return quantity * price + accumulator;
      };
      this.totalPrice = this.cartItems.reduce(reducer, 0);
    });
  }
  ngOnInit(): void {
    this.loadAll();
  }
  removeItem(id: number | undefined): void {
    if (id)
      this.cartItemService.delete(id).subscribe(() => {
        this.loadAll();
      });
  }
  checkout(): void {
    // 1. generate orders
    // /* eslint-disable */console.log(this.cartItems);
    // 2. clear current user's shopping cart
    this.shoppingCartService.checkout(this.cartItems).subscribe(/* eslint-disable */ response => location.reload());
  }
}
