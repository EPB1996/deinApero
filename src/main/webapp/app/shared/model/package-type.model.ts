import { IPackageTemplate } from 'app/shared/model/package-template.model';

export interface IPackageType {
  id?: string;
  name?: string;
  description?: string | null;
  price?: number;
  packageTemplate?: IPackageTemplate | null;
}

export const defaultValue: Readonly<IPackageType> = {};
