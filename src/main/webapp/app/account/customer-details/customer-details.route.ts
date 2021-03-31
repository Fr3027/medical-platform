import { Route } from '@angular/router';
import { CustomerDetailsUpdateComponent } from '../../entities/customer-details/customer-details-update.component';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { CustomerDetailsResolve } from 'app/entities/customer-details/customer-details.route';
export const customerRoute: Route = {
  path: 'customer-details/:id',
  component: CustomerDetailsUpdateComponent,
  resolve: {
    customerDetails: CustomerDetailsResolve,
  },
  data: {
    authorities: [Authority.USER],
    pageTitle: 'demoApp.customerDetails.home.title',
  },
  canActivate: [UserRouteAccessService],
};
