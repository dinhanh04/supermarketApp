import { IOrderItem, NewOrderItem } from './order-item.model';

export const sampleWithRequiredData: IOrderItem = {
  id: 16549,
  quantity: 23988,
  unitPrice: 22506.51,
  lineTotal: 12961.94,
};

export const sampleWithPartialData: IOrderItem = {
  id: 27299,
  quantity: 22463,
  unitPrice: 24133.36,
  lineTotal: 5412.34,
};

export const sampleWithFullData: IOrderItem = {
  id: 6728,
  quantity: 17449,
  unitPrice: 20263.67,
  discount: 10948.34,
  lineTotal: 406.75,
};

export const sampleWithNewData: NewOrderItem = {
  quantity: 12165,
  unitPrice: 1027.11,
  lineTotal: 12468.3,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
