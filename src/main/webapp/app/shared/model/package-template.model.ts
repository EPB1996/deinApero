import { IProduct } from 'app/shared/model/product.model';

export interface IPackageTemplate {
  id?: string;
  name?: string;
  products?: IProduct[] | null;
}

export const defaultValue: Readonly<IPackageTemplate> = {};
