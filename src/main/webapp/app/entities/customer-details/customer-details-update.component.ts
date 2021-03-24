import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICustomerDetails, CustomerDetails } from 'app/shared/model/customer-details.model';
import { CustomerDetailsService } from './customer-details.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-customer-details-update',
  templateUrl: './customer-details-update.component.html',
})
export class CustomerDetailsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    gender: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    addressLine1: [null, [Validators.required]],
    addressLine2: [],
    city: [null, [Validators.required]],
    country: [null, [Validators.required]],
    user: [],
  });

  constructor(
    protected customerDetailsService: CustomerDetailsService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerDetails }) => {
      this.updateForm(customerDetails);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(customerDetails: ICustomerDetails): void {
    this.editForm.patchValue({
      id: customerDetails.id,
      gender: customerDetails.gender,
      phone: customerDetails.phone,
      addressLine1: customerDetails.addressLine1,
      addressLine2: customerDetails.addressLine2,
      city: customerDetails.city,
      country: customerDetails.country,
      user: customerDetails.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerDetails = this.createFromForm();
    if (customerDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.customerDetailsService.update(customerDetails));
    } else {
      this.subscribeToSaveResponse(this.customerDetailsService.create(customerDetails));
    }
  }

  private createFromForm(): ICustomerDetails {
    return {
      ...new CustomerDetails(),
      id: this.editForm.get(['id'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      addressLine1: this.editForm.get(['addressLine1'])!.value,
      addressLine2: this.editForm.get(['addressLine2'])!.value,
      city: this.editForm.get(['city'])!.value,
      country: this.editForm.get(['country'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerDetails>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
