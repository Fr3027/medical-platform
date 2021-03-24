import { IProductCategory } from 'app/shared/model/product-category.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  brand?: string;
  approvalNumber?: string;
  instruction?: string;
  manufacturer?: string;
  type?: string;
  validPeriod?: string;
  imageContentType?: string;
  image?: any;
  productCategory?: IProductCategory;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public price?: number,
    public brand?: string,
    public approvalNumber?: string,
    public instruction?: string,
    public manufacturer?: string,
    public type?: string,
    public validPeriod?: string,
    public imageContentType?: string,
    public image?: any,
    public productCategory?: IProductCategory
  ) {}
}
