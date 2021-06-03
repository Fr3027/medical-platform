import { Route } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ShoppingCartComponent } from './shopping-cart.component';
import { Authority } from 'app/shared/constants/authority.constants';

export const shoppingCartRoute: Route = {
  path: 'shoppingCart',
  component: ShoppingCartComponent,
  data: {
    authorities: [Authority.USER],
  },
  canActivate: [UserRouteAccessService],
};
