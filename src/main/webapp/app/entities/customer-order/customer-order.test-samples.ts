import dayjs from 'dayjs/esm';

import { ICustomerOrder, NewCustomerOrder } from './customer-order.model';

export const sampleWithRequiredData: ICustomerOrder = {
  id: 2458,
  code: 'afore gorgeous syringe',
  orderDate: dayjs('2025-09-09T01:41'),
  status: 'CANCELED',
  totalAmount: 17410.16,
  paymentMethod: 'BANK_TRANSFER',
};

export const sampleWithPartialData: ICustomerOrder = {
  id: 7725,
  code: 'state',
  orderDate: dayjs('2025-09-08T19:32'),
  status: 'COMPLETED',
  totalAmount: 3675.02,
  paymentMethod: 'BANK_TRANSFER',
};

export const sampleWithFullData: ICustomerOrder = {
  id: 24520,
  code: 'continually optimal',
  orderDate: dayjs('2025-09-08T07:58'),
  status: 'REFUNDED',
  totalAmount: 26139.36,
  paymentMethod: 'COD',
  shippingAddress: 'splosh',
  note: 'if plain evil',
};

export const sampleWithNewData: NewCustomerOrder = {
  code: 'encode thoughtfully',
  orderDate: dayjs('2025-09-09T02:47'),
  status: 'COMPLETED',
  totalAmount: 8378.22,
  paymentMethod: 'CREDIT_CARD',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
