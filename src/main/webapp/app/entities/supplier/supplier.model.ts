import { IStore } from 'app/entities/store/store.model';

export interface ISupplier {
  id: number;
  name?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  taxCode?: string | null;
  addressText?: string | null;
  stores?: Pick<IStore, 'id'>[] | null;
}

export type NewSupplier = Omit<ISupplier, 'id'> & { id: null };
