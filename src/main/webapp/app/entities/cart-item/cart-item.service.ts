import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICartItem } from 'app/shared/model/cart-item.model';

type EntityResponseType = HttpResponse<ICartItem>;
type EntityArrayResponseType = HttpResponse<ICartItem[]>;

@Injectable({ providedIn: 'root' })
export class CartItemService {
  public resourceUrl = SERVER_API_URL + 'api/cart-items';

  constructor(protected http: HttpClient) {}

  create(cartItem: ICartItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cartItem);
    return this.http
      .post<ICartItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cartItem: ICartItem): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cartItem);
    return this.http
      .put<ICartItem>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICartItem>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICartItem[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cartItem: ICartItem): ICartItem {
    const copy: ICartItem = Object.assign({}, cartItem, {
      placeDate: cartItem.placeDate && cartItem.placeDate.isValid() ? cartItem.placeDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.placeDate = res.body.placeDate ? moment(res.body.placeDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cartItem: ICartItem) => {
        cartItem.placeDate = cartItem.placeDate ? moment(cartItem.placeDate) : undefined;
      });
    }
    return res;
  }
}
