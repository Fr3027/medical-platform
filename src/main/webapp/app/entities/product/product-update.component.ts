import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from 'app/entities/product-category/product-category.service';
import { AccountService } from 'app/core/auth/account.service';

type SelectableEntity = IUser | IProductCategory;

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  user!: IUser;
  productcategories: IProductCategory[] = [];
  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required, Validators.min(0)]],
    brand: [null, [Validators.required]],
    approvalNumber: [null, [Validators.required]],
    instruction: [null, [Validators.required]],
    manufacturer: [null, [Validators.required]],
    type: [null, [Validators.required]],
    validPeriod: [null, [Validators.required]],
    image: [null, [Validators.required]],
    imageContentType: [],
    productCategory: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    private accountService: AccountService,
    protected eventManager: JhiEventManager,
    protected productService: ProductService,
    protected userService: UserService,
    protected productCategoryService: ProductCategoryService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
      this.accountService.identity().subscribe(account => {
        this.userService.find(account!.login).subscribe(user => (this.user = user));
      });
      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));
    });
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      approvalNumber: product.approvalNumber,
      instruction: product.instruction,
      manufacturer: product.manufacturer,
      type: product.type,
      validPeriod: product.validPeriod,
      image: product.image,
      imageContentType: product.imageContentType,
      productCategory: product.productCategory,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('demoApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    product.user = this.user;
    console.warn(product);
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      price: this.editForm.get(['price'])!.value,
      brand: this.editForm.get(['brand'])!.value,
      approvalNumber: this.editForm.get(['approvalNumber'])!.value,
      instruction: this.editForm.get(['instruction'])!.value,
      manufacturer: this.editForm.get(['manufacturer'])!.value,
      type: this.editForm.get(['type'])!.value,
      validPeriod: this.editForm.get(['validPeriod'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
      productCategory: this.editForm.get(['productCategory'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
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
