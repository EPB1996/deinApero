import { IProductCategory } from 'app/shared/model/product-category.model';
import { IPackageTemplate } from 'app/shared/model/package-template.model';
import { Size } from 'app/shared/model/enumerations/size.model';

export interface IProduct {
  id?: string;
  name?: string;
  description?: string | null;
  price?: number;
  productSize?: Size;
  imageContentType?: string | null;
  image?: string | null;
  productCategory?: IProductCategory | null;
  packageTemplates?: IPackageTemplate[];
}

export const defaultValue: Readonly<IProduct> = {};
