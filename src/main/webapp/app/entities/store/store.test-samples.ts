import dayjs from 'dayjs/esm';

import { IStore, NewStore } from './store.model';

export const sampleWithRequiredData: IStore = {
  id: 23647,
  code: 'noisily drat',
  name: 'oof overdub',
  address: 'indeed drab',
  city: 'Constanceville',
  country: 'South Georgia and the South Sandwich Islands',
};

export const sampleWithPartialData: IStore = {
  id: 20021,
  code: 'bakeware',
  name: 'as consequently',
  description: 'cook till necessary',
  phone: '415.328.6885 x39503',
  address: 'decryption toward medium',
  city: 'Oralview',
  country: 'Cape Verde',
  openingHours: 'charter shanghai rewrite',
  createdAt: dayjs('2025-09-08T23:33'),
  updatedAt: dayjs('2025-09-08T14:44'),
};

export const sampleWithFullData: IStore = {
  id: 9173,
  code: 'twine blah tattered',
  name: 'forgo gray officially',
  description: 'anti',
  phone: '1-691-565-0344 x8466',
  email: 'n:/R0%@E?T/d".bq',
  address: 'upward punctual fatally',
  city: 'North Gracielaview',
  country: 'Bouvet Island',
  openingHours: 'house',
  createdAt: dayjs('2025-09-08T11:35'),
  updatedAt: dayjs('2025-09-09T04:40'),
};

export const sampleWithNewData: NewStore = {
  code: 'immense',
  name: 'sadly hoot bungalow',
  address: 'eek now',
  city: 'Fort Bricechester',
  country: 'Aruba',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
