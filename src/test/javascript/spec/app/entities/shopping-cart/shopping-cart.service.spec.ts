import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ShoppingCartService } from 'app/entities/shopping-cart/shopping-cart.service';
import { IShoppingCart, ShoppingCart } from 'app/shared/model/shopping-cart.model';

describe('Service Tests', () => {
  describe('ShoppingCart Service', () => {
    let injector: TestBed;
    let service: ShoppingCartService;
    let httpMock: HttpTestingController;
    let elemDefault: IShoppingCart;
    let expectedResult: IShoppingCart | IShoppingCart[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ShoppingCartService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ShoppingCart(0, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            placedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ShoppingCart', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            placedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate,
          },
          returnedFromService
        );

        service.create(new ShoppingCart()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ShoppingCart', () => {
        const returnedFromService = Object.assign(
          {
            placedDate: currentDate.format(DATE_TIME_FORMAT),
            totalPrice: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ShoppingCart', () => {
        const returnedFromService = Object.assign(
          {
            placedDate: currentDate.format(DATE_TIME_FORMAT),
            totalPrice: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ShoppingCart', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
