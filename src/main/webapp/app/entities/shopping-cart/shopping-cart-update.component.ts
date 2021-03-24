import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

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
    placedDate: [null, [Validators.required]],
    totalPrice: [null, [Validators.required, Validators.min(0)]],
    customerDetails: [null, Validators.required],
  });

  constructor(
    protected shoppingCartService: ShoppingCartService,
    protected customerDetailsService: CustomerDetailsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingCart }) => {
      if (!shoppingCart.id) {
        const today = moment().startOf('day');
        shoppingCart.placedDate = today;
      }

      this.updateForm(shoppingCart);

      this.customerDetailsService.query().subscribe((res: HttpResponse<ICustomerDetails[]>) => (this.customerdetails = res.body || []));
    });
  }

  updateForm(shoppingCart: IShoppingCart): void {
    this.editForm.patchValue({
      id: shoppingCart.id,
      placedDate: shoppingCart.placedDate ? shoppingCart.placedDate.format(DATE_TIME_FORMAT) : null,
      totalPrice: shoppingCart.totalPrice,
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
      placedDate: this.editForm.get(['placedDate'])!.value ? moment(this.editForm.get(['placedDate'])!.value, DATE_TIME_FORMAT) : undefined,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
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
