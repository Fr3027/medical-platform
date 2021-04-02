import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';

type EntityResponseType = HttpResponse<IShoppingCart>;
type EntityArrayResponseType = HttpResponse<IShoppingCart[]>;

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  public resourceUrl = SERVER_API_URL + 'api/shopping-carts';

  constructor(protected http: HttpClient) {}

  create(shoppingCart: IShoppingCart): Observable<EntityResponseType> {
    return this.http.post<IShoppingCart>(this.resourceUrl, shoppingCart, { observe: 'response' });
  }

  update(shoppingCart: IShoppingCart): Observable<EntityResponseType> {
    return this.http.put<IShoppingCart>(this.resourceUrl, shoppingCart, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShoppingCart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShoppingCart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
