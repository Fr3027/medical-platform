import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAdvisory } from 'app/shared/model/advisory.model';

@Component({
  selector: 'jhi-advisory-detail',
  templateUrl: './advisory-detail.component.html',
})
export class AdvisoryDetailComponent implements OnInit {
  advisory: IAdvisory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ advisory }) => (this.advisory = advisory));
  }

  previousState(): void {
    window.history.back();
  }
}
