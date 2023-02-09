import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IOrderItem {
  id?: string;
  quantity?: number;
  totalPrice?: number;
  product?: IProduct;
  order?: IOrder;
}

export const defaultValue: Readonly<IOrderItem> = {};
