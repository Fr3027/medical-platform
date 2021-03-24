import { IProduct } from 'app/shared/model/product.model';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';

export interface IProductOrder {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  product?: IProduct;
  cart?: IShoppingCart;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public quantity?: number,
    public totalPrice?: number,
    public product?: IProduct,
    public cart?: IShoppingCart
  ) {}
}
