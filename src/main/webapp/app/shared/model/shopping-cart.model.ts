import { Moment } from 'moment';
import { IProductOrder } from 'app/shared/model/product-order.model';
import { ICustomerDetails } from 'app/shared/model/customer-details.model';

export interface IShoppingCart {
  id?: number;
  placedDate?: Moment;
  totalPrice?: number;
  orders?: IProductOrder[];
  customerDetails?: ICustomerDetails;
}

export class ShoppingCart implements IShoppingCart {
  constructor(
    public id?: number,
    public placedDate?: Moment,
    public totalPrice?: number,
    public orders?: IProductOrder[],
    public customerDetails?: ICustomerDetails
  ) {}
}
