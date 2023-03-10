import { IPackageTemplate } from 'app/shared/model/package-template.model';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { Size } from 'app/shared/model/enumerations/size.model';

export interface IProduct {
  id?: string;
  name?: string;
  description?: string | null;
  price?: number;
  productSize?: Size;
  imageContentType?: string | null;
  image?: string | null;
  packageTemplates?: IPackageTemplate[] | null;
  productCategories?: IProductCategory[] | null;
}

export const defaultValue: Readonly<IProduct> = {};
