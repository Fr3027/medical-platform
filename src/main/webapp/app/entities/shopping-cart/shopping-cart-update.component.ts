import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IShoppingCart, ShoppingCart } from 'app/shared/model/shopping-cart.model';
import { ShoppingCartService } from './shopping-cart.service';
import { ICustomerDetails } from 'app/shared/model/customer-details.model';
import { CustomerDetailsService } from 'app/entities/customer-details/customer-details.service';

@Component({
  selector: 'jhi-shopping-cart-update',
  templateUrl: './shopping-cart-update.component.html',
})
export class ShoppingCartUpdateComponent implements OnInit {
  isSaving = false;
  customerdetails: ICustomerDetails[] = [];

  editForm = this.fb.group({
    id: [],
    customerDetails: [],
  });

  constructor(
    protected shoppingCartService: ShoppingCartService,
    protected customerDetailsService: CustomerDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingCart }) => {
      this.updateForm(shoppingCart);

      this.customerDetailsService
        .query({ filter: 'shoppingcart-is-null' })
        .pipe(
          map((res: HttpResponse<ICustomerDetails[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ICustomerDetails[]) => {
          if (!shoppingCart.customerDetails || !shoppingCart.customerDetails.id) {
            this.customerdetails = resBody;
          } else {
            this.customerDetailsService
              .find(shoppingCart.customerDetails.id)
              .pipe(
                map((subRes: HttpResponse<ICustomerDetails>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ICustomerDetails[]) => (this.customerdetails = concatRes));
          }
        });
    });
  }

  updateForm(shoppingCart: IShoppingCart): void {
    this.editForm.patchValue({
      id: shoppingCart.id,
      customerDetails: shoppingCart.customerDetails,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shoppingCart = this.createFromForm();
    if (shoppingCart.id !== undefined) {
      this.subscribeToSaveResponse(this.shoppingCartService.update(shoppingCart));
    } else {
      this.subscribeToSaveResponse(this.shoppingCartService.create(shoppingCart));
    }
  }

  private createFromForm(): IShoppingCart {
    return {
      ...new ShoppingCart(),
      id: this.editForm.get(['id'])!.value,
      customerDetails: this.editForm.get(['customerDetails'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoppingCart>>): void {
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

  trackById(index: number, item: ICustomerDetails): any {
    return item.id;
  }
}
