import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdvisory, Advisory } from 'app/shared/model/advisory.model';
import { AdvisoryService } from './advisory.service';
import { AdvisoryComponent } from './advisory.component';
import { AdvisoryDetailComponent } from './advisory-detail.component';
import { AdvisoryUpdateComponent } from './advisory-update.component';

@Injectable({ providedIn: 'root' })
export class AdvisoryResolve implements Resolve<IAdvisory> {
  constructor(private service: AdvisoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdvisory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((advisory: HttpResponse<Advisory>) => {
          if (advisory.body) {
            return of(advisory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Advisory());
  }
}

export const advisoryRoute: Routes = [
  {
    path: '',
    component: AdvisoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.advisory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdvisoryDetailComponent,
    resolve: {
      advisory: AdvisoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.advisory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdvisoryUpdateComponent,
    resolve: {
      advisory: AdvisoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.advisory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdvisoryUpdateComponent,
    resolve: {
      advisory: AdvisoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.advisory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
