import dayjs from 'dayjs/esm';
import { ICategory } from 'app/entities/category/category.model';
import { ISupplier } from 'app/entities/supplier/supplier.model';
import { IPromotion } from 'app/entities/promotion/promotion.model';
import { ProductStatus } from 'app/entities/enumerations/product-status.model';

export interface IProduct {
  id: number;
  sku?: string | null;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  cost?: number | null;
  stock?: number | null;
  imageUrl?: string | null;
  status?: keyof typeof ProductStatus | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  category?: Pick<ICategory, 'id' | 'name'> | null;
  suppliedBy?: Pick<ISupplier, 'id' | 'name'> | null;
  promotions?: Pick<IPromotion, 'id'>[] | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
