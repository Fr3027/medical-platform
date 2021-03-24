import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdvisory } from 'app/shared/model/advisory.model';
import { AdvisoryService } from './advisory.service';
import { AdvisoryDeleteDialogComponent } from './advisory-delete-dialog.component';

@Component({
  selector: 'jhi-advisory',
  templateUrl: './advisory.component.html',
})
export class AdvisoryComponent implements OnInit, OnDestroy {
  advisories?: IAdvisory[];
  eventSubscriber?: Subscription;

  constructor(protected advisoryService: AdvisoryService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.advisoryService.query().subscribe((res: HttpResponse<IAdvisory[]>) => (this.advisories = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAdvisories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAdvisory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAdvisories(): void {
    this.eventSubscriber = this.eventManager.subscribe('advisoryListModification', () => this.loadAll());
  }

  delete(advisory: IAdvisory): void {
    const modalRef = this.modalService.open(AdvisoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.advisory = advisory;
  }
}
