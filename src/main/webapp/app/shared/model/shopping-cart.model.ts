import { ICustomerDetails } from 'app/shared/model/customer-details.model';
import { ICartItem } from 'app/shared/model/cart-item.model';

export interface IShoppingCart {
  id?: number;
  customerDetails?: ICustomerDetails;
  cartItems?: ICartItem[];
}

export class ShoppingCart implements IShoppingCart {
  constructor(public id?: number, public customerDetails?: ICustomerDetails, public cartItems?: ICartItem[]) {}
}
