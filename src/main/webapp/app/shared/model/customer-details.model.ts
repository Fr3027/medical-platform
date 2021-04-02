import { IUser } from 'app/core/user/user.model';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomerDetails {
  id?: number;
  gender?: Gender;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  user?: IUser;
  shoppingCart?: IShoppingCart;
}

export class CustomerDetails implements ICustomerDetails {
  constructor(
    public id?: number,
    public gender?: Gender,
    public phone?: string,
    public addressLine1?: string,
    public addressLine2?: string,
    public city?: string,
    public country?: string,
    public user?: IUser,
    public shoppingCart?: IShoppingCart
  ) {}
}
