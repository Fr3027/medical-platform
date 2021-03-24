import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAdvisory, Advisory } from 'app/shared/model/advisory.model';
import { AdvisoryService } from './advisory.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-advisory-update',
  templateUrl: './advisory-update.component.html',
})
export class AdvisoryUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    created: [],
    updated: [],
    title: [],
    detail: [],
    answer: [],
    initiator: [],
    proposer: [],
    user: [],
  });

  constructor(
    protected advisoryService: AdvisoryService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ advisory }) => {
      if (!advisory.id) {
        const today = moment().startOf('day');
        advisory.created = today;
        advisory.updated = today;
      }

      this.updateForm(advisory);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(advisory: IAdvisory): void {
    this.editForm.patchValue({
      id: advisory.id,
      created: advisory.created ? advisory.created.format(DATE_TIME_FORMAT) : null,
      updated: advisory.updated ? advisory.updated.format(DATE_TIME_FORMAT) : null,
      title: advisory.title,
      detail: advisory.detail,
      answer: advisory.answer,
      initiator: advisory.initiator,
      proposer: advisory.proposer,
      user: advisory.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const advisory = this.createFromForm();
    if (advisory.id !== undefined) {
      this.subscribeToSaveResponse(this.advisoryService.update(advisory));
    } else {
      this.subscribeToSaveResponse(this.advisoryService.create(advisory));
    }
  }

  private createFromForm(): IAdvisory {
    return {
      ...new Advisory(),
      id: this.editForm.get(['id'])!.value,
      created: this.editForm.get(['created'])!.value ? moment(this.editForm.get(['created'])!.value, DATE_TIME_FORMAT) : undefined,
      updated: this.editForm.get(['updated'])!.value ? moment(this.editForm.get(['updated'])!.value, DATE_TIME_FORMAT) : undefined,
      title: this.editForm.get(['title'])!.value,
      detail: this.editForm.get(['detail'])!.value,
      answer: this.editForm.get(['answer'])!.value,
      initiator: this.editForm.get(['initiator'])!.value,
      proposer: this.editForm.get(['proposer'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdvisory>>): void {
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
