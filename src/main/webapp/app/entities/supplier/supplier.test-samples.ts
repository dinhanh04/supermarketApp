import { ISupplier, NewSupplier } from './supplier.model';

export const sampleWithRequiredData: ISupplier = {
  id: 22717,
  name: 'menacing',
};

export const sampleWithPartialData: ISupplier = {
  id: 2357,
  name: 'midst digit',
  contactPhone: 'aha phew artistic',
  addressText: 'apropos airline another',
};

export const sampleWithFullData: ISupplier = {
  id: 3840,
  name: 'cheerfully near',
  contactName: 'providence ick scholarship',
  contactEmail: 'i/@ZIfOGT.hw{>',
  contactPhone: 'dependency',
  taxCode: 'once likewise',
  addressText: 'enlightened',
};

export const sampleWithNewData: NewSupplier = {
  name: 'snack',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
