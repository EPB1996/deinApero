import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';
import { OrderItemStatus } from 'app/shared/model/enumerations/order-item-status.model';

export interface IOrderItem {
  id?: string;
  quantity?: number;
  totalPrice?: number;
  status?: OrderItemStatus;
  product?: IProduct;
  order?: IOrder;
}

export const defaultValue: Readonly<IOrderItem> = {};
