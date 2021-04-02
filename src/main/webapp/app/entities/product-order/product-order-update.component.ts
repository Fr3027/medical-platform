import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProductOrder, ProductOrder } from 'app/shared/model/product-order.model';
import { ProductOrderService } from './product-order.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IProduct | IUser;

@Component({
  selector: 'jhi-product-order-update',
  templateUrl: './product-order-update.component.html',
})
export class ProductOrderUpdateComponent implements OnInit {
  isSaving = false;
  products: IProduct[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [null, [Validators.required, Validators.min(0)]],
    totalPrice: [null, [Validators.required, Validators.min(0)]],
    created: [null, [Validators.required]],
    address: [null, [Validators.required]],
    status: [null, [Validators.required]],
    product: [null, Validators.required],
    user: [null, Validators.required],
  });

  constructor(
    protected productOrderService: ProductOrderService,
    protected productService: ProductService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productOrder }) => {
      if (!productOrder.id) {
        const today = moment().startOf('day');
        productOrder.created = today;
      }

      this.updateForm(productOrder);

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(productOrder: IProductOrder): void {
    this.editForm.patchValue({
      id: productOrder.id,
      quantity: productOrder.quantity,
      totalPrice: productOrder.totalPrice,
      created: productOrder.created ? productOrder.created.format(DATE_TIME_FORMAT) : null,
      address: productOrder.address,
      status: productOrder.status,
      product: productOrder.product,
      user: productOrder.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productOrder = this.createFromForm();
    if (productOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.productOrderService.update(productOrder));
    } else {
      this.subscribeToSaveResponse(this.productOrderService.create(productOrder));
    }
  }

  private createFromForm(): IProductOrder {
    return {
      ...new ProductOrder(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
      created: this.editForm.get(['created'])!.value ? moment(this.editForm.get(['created'])!.value, DATE_TIME_FORMAT) : undefined,
      address: this.editForm.get(['address'])!.value,
      status: this.editForm.get(['status'])!.value,
      product: this.editForm.get(['product'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductOrder>>): void {
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
