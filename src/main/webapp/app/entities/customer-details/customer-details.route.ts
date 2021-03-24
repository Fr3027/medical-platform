import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerDetails, CustomerDetails } from 'app/shared/model/customer-details.model';
import { CustomerDetailsService } from './customer-details.service';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomerDetailsDetailComponent } from './customer-details-detail.component';
import { CustomerDetailsUpdateComponent } from './customer-details-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerDetailsResolve implements Resolve<ICustomerDetails> {
  constructor(private service: CustomerDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerDetails: HttpResponse<CustomerDetails>) => {
          if (customerDetails.body) {
            return of(customerDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerDetails());
  }
}

export const customerDetailsRoute: Routes = [
  {
    path: '',
    component: CustomerDetailsComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'demoApp.customerDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerDetailsDetailComponent,
    resolve: {
      customerDetails: CustomerDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.customerDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerDetailsUpdateComponent,
    resolve: {
      customerDetails: CustomerDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.customerDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerDetailsUpdateComponent,
    resolve: {
      customerDetails: CustomerDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.customerDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
