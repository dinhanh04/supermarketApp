import { ICustomer } from 'app/entities/customer/customer.model';

export interface IAddress {
  id: number;
  line1?: string | null;
  line2?: string | null;
  ward?: string | null;
  district?: string | null;
  city?: string | null;
  country?: string | null;
  postalCode?: string | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewAddress = Omit<IAddress, 'id'> & { id: null };
