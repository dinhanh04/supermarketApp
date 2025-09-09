import dayjs from 'dayjs/esm';

import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 3366,
  code: 'slake splurge',
  firstName: 'Jennyfer',
  lastName: 'Heller',
  email: ':GR@i0~.9G!',
  status: 'INACTIVE',
};

export const sampleWithPartialData: ICustomer = {
  id: 9679,
  code: 'insolence window secret',
  firstName: 'Jordan',
  lastName: 'Toy',
  email: 'p_"s;@}gn.}/30',
  status: 'INACTIVE',
  updatedAt: dayjs('2025-09-08T18:20'),
};

export const sampleWithFullData: ICustomer = {
  id: 4149,
  code: 'where known',
  firstName: 'Amie',
  lastName: 'Schmeler',
  email: '+k7[LD@3!.u-',
  phone: '633.446.5026',
  dob: dayjs('2025-09-08'),
  gender: 'FEMALE',
  status: 'ACTIVE',
  createdAt: dayjs('2025-09-08T15:24'),
  updatedAt: dayjs('2025-09-08T23:01'),
};

export const sampleWithNewData: NewCustomer = {
  code: 'thyme inasmuch',
  firstName: 'Carlos',
  lastName: 'Green',
  email: "9Id2@Tc?kl0.A9O'9x",
  status: 'SUSPENDED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
