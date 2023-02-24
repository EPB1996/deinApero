import { IProduct } from 'app/shared/model/product.model';
import { IUser } from 'app/shared/model/user.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IOrderItem {
  id?: string;
  quantity?: number;
  totalPrice?: number;
  product?: IProduct;
  user?: IUser;
  order?: IOrder;
}

export const defaultValue: Readonly<IOrderItem> = {};
