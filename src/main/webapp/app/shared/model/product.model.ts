import { IProductCategory } from 'app/shared/model/product-category.model';

export interface IProduct {
  id?: string;
  name?: string;
  description?: string | null;
  price?: number;
  imageContentType?: string | null;
  image?: string | null;
  productCategories?: IProductCategory[] | null;
}

export const defaultValue: Readonly<IProduct> = {};
