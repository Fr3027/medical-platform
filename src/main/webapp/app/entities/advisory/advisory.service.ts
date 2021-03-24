import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAdvisory } from 'app/shared/model/advisory.model';

type EntityResponseType = HttpResponse<IAdvisory>;
type EntityArrayResponseType = HttpResponse<IAdvisory[]>;

@Injectable({ providedIn: 'root' })
export class AdvisoryService {
  public resourceUrl = SERVER_API_URL + 'api/advisories';

  constructor(protected http: HttpClient) {}

  create(advisory: IAdvisory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(advisory);
    return this.http
      .post<IAdvisory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(advisory: IAdvisory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(advisory);
    return this.http
      .put<IAdvisory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAdvisory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAdvisory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(advisory: IAdvisory): IAdvisory {
    const copy: IAdvisory = Object.assign({}, advisory, {
      created: advisory.created && advisory.created.isValid() ? advisory.created.toJSON() : undefined,
      updated: advisory.updated && advisory.updated.isValid() ? advisory.updated.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created ? moment(res.body.created) : undefined;
      res.body.updated = res.body.updated ? moment(res.body.updated) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((advisory: IAdvisory) => {
        advisory.created = advisory.created ? moment(advisory.created) : undefined;
        advisory.updated = advisory.updated ? moment(advisory.updated) : undefined;
      });
    }
    return res;
  }
}
