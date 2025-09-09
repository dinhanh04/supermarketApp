import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';
import { ICustomer } from 'app/entities/customer/customer.model';

export interface IReview {
  id: number;
  rating?: number | null;
  title?: string | null;
  content?: string | null;
  createdAt?: dayjs.Dayjs | null;
  visible?: boolean | null;
  product?: Pick<IProduct, 'id' | 'name'> | null;
  customer?: Pick<ICustomer, 'id' | 'code'> | null;
}

export type NewReview = Omit<IReview, 'id'> & { id: null };
