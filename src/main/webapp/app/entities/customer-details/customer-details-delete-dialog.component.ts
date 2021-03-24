import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerDetails } from 'app/shared/model/customer-details.model';
import { CustomerDetailsService } from './customer-details.service';

@Component({
  templateUrl: './customer-details-delete-dialog.component.html',
})
export class CustomerDetailsDeleteDialogComponent {
  customerDetails?: ICustomerDetails;

  constructor(
    protected customerDetailsService: CustomerDetailsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerDetailsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerDetailsListModification');
      this.activeModal.close();
    });
  }
}
