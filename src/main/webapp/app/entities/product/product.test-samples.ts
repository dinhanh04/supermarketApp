import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 11737,
  sku: 'hm sleepily',
  name: 'yippee whoever',
  price: 16146.92,
  stock: 2897,
  status: 'INACTIVE',
};

export const sampleWithPartialData: IProduct = {
  id: 28292,
  sku: 'delightfully mild',
  name: 'unnecessarily ferret',
  price: 23497.41,
  cost: 14081.32,
  stock: 6162,
  status: 'OUT_OF_STOCK',
};

export const sampleWithFullData: IProduct = {
  id: 4403,
  sku: 'cafe',
  name: 'along amongst',
  description: '../fake-data/blob/hipster.txt',
  price: 12917.62,
  cost: 110.1,
  stock: 32036,
  imageUrl: 'until solemnly',
  status: 'ACTIVE',
  createdAt: dayjs('2025-09-09T02:47'),
  updatedAt: dayjs('2025-09-08T08:22'),
};

export const sampleWithNewData: NewProduct = {
  sku: 'anti inject why',
  name: 'anenst narrow apropos',
  price: 7532.66,
  stock: 30545,
  status: 'INACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
