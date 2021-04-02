import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';

export interface ICartItem {
  id?: number;
  quantity?: number;
  placeDate?: Moment;
  product?: IProduct;
  cart?: IShoppingCart;
}

export class CartItem implements ICartItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public placeDate?: Moment,
    public product?: IProduct,
    public cart?: IShoppingCart
  ) {}
}
