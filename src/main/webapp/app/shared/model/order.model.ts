import dayjs from 'dayjs';
import { ICustomer } from 'app/shared/model/customer.model';
import { IOrderItem } from 'app/shared/model/order-item.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: string;
  placedDate?: string;
  status?: OrderStatus;
  code?: string;
  customer?: ICustomer | null;
  orderItems?: IOrderItem[] | null;
}

export const defaultValue: Readonly<IOrder> = {};
