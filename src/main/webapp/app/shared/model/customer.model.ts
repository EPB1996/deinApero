import { IUser } from 'app/shared/model/user.model';
import { IOrder } from 'app/shared/model/order.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomer {
  id?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  zip?: number;
  city?: string;
  user?: IUser;
  orders?: IOrder[] | null;
}

export const defaultValue: Readonly<ICustomer> = {};
