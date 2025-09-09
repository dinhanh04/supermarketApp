import { IProduct } from 'app/entities/product/product.model';
import { ICustomerOrder } from 'app/entities/customer-order/customer-order.model';

export interface IOrderItem {
  id: number;
  quantity?: number | null;
  unitPrice?: number | null;
  discount?: number | null;
  lineTotal?: number | null;
  product?: Pick<IProduct, 'id' | 'sku'> | null;
  order?: Pick<ICustomerOrder, 'id'> | null;
}

export type NewOrderItem = Omit<IOrderItem, 'id'> & { id: null };
