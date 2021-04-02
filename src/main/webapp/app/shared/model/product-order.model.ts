import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { IUser } from 'app/core/user/user.model';
import { STATUS } from 'app/shared/model/enumerations/status.model';

export interface IProductOrder {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  created?: Moment;
  address?: string;
  status?: STATUS;
  product?: IProduct;
  user?: IUser;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public quantity?: number,
    public totalPrice?: number,
    public created?: Moment,
    public address?: string,
    public status?: STATUS,
    public product?: IProduct,
    public user?: IUser
  ) {}
}
