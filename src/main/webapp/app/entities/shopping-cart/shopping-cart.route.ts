import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShoppingCart, ShoppingCart } from 'app/shared/model/shopping-cart.model';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartDetailComponent } from './shopping-cart-detail.component';
import { ShoppingCartUpdateComponent } from './shopping-cart-update.component';

@Injectable({ providedIn: 'root' })
export class ShoppingCartResolve implements Resolve<IShoppingCart> {
  constructor(private service: ShoppingCartService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShoppingCart> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shoppingCart: HttpResponse<ShoppingCart>) => {
          if (shoppingCart.body) {
            return of(shoppingCart.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShoppingCart());
  }
}

export const shoppingCartRoute: Routes = [
  {
    path: '',
    component: ShoppingCartComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.shoppingCart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShoppingCartDetailComponent,
    resolve: {
      shoppingCart: ShoppingCartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.shoppingCart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShoppingCartUpdateComponent,
    resolve: {
      shoppingCart: ShoppingCartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.shoppingCart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShoppingCartUpdateComponent,
    resolve: {
      shoppingCart: ShoppingCartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'demoApp.shoppingCart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
