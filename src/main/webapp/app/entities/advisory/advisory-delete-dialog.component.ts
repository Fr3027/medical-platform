import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdvisory } from 'app/shared/model/advisory.model';
import { AdvisoryService } from './advisory.service';

@Component({
  templateUrl: './advisory-delete-dialog.component.html',
})
export class AdvisoryDeleteDialogComponent {
  advisory?: IAdvisory;

  constructor(protected advisoryService: AdvisoryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.advisoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('advisoryListModification');
      this.activeModal.close();
    });
  }
}
