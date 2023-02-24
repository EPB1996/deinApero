import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomer {
  id?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string | null;
  addressLine2?: string | null;
  zip?: number | null;
  city?: string | null;
}

export const defaultValue: Readonly<ICustomer> = {};
