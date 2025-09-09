import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';
import { PromotionType } from 'app/entities/enumerations/promotion-type.model';

export interface IPromotion {
  id: number;
  name?: string | null;
  type?: keyof typeof PromotionType | null;
  value?: number | null;
  startAt?: dayjs.Dayjs | null;
  endAt?: dayjs.Dayjs | null;
  active?: boolean | null;
  products?: Pick<IProduct, 'id'>[] | null;
}

export type NewPromotion = Omit<IPromotion, 'id'> & { id: null };
