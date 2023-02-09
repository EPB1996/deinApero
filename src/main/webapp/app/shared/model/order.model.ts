import dayjs from 'dayjs';
import { IPackageType } from 'app/shared/model/package-type.model';
import { IOrderItem } from 'app/shared/model/order-item.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: string;
  placedDate?: string;
  status?: OrderStatus;
  code?: string;
  packageType?: IPackageType | null;
  orderItems?: IOrderItem[] | null;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IOrder> = {};
