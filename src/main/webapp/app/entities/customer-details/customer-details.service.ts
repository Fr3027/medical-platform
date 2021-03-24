import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerDetails } from 'app/shared/model/customer-details.model';

type EntityResponseType = HttpResponse<ICustomerDetails>;
type EntityArrayResponseType = HttpResponse<ICustomerDetails[]>;

@Injectable({ providedIn: 'root' })
export class CustomerDetailsService {
  public resourceUrl = SERVER_API_URL + 'api/customer-details';

  constructor(protected http: HttpClient) {}

  create(customerDetails: ICustomerDetails): Observable<EntityResponseType> {
    return this.http.post<ICustomerDetails>(this.resourceUrl, customerDetails, { observe: 'response' });
  }

  update(customerDetails: ICustomerDetails): Observable<EntityResponseType> {
    return this.http.put<ICustomerDetails>(this.resourceUrl, customerDetails, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerDetails>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerDetails[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
