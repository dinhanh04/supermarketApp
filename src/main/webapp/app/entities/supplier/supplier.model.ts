export interface ISupplier {
  id: number;
  name?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  taxCode?: string | null;
  addressText?: string | null;
}

export type NewSupplier = Omit<ISupplier, 'id'> & { id: null };
