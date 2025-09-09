import dayjs from 'dayjs/esm';

import { IPromotion, NewPromotion } from './promotion.model';

export const sampleWithRequiredData: IPromotion = {
  id: 12646,
  name: 'clear aha',
  type: 'FIXED',
  value: 7274.03,
  startAt: dayjs('2025-09-08T20:19'),
  endAt: dayjs('2025-09-08T17:04'),
  active: true,
};

export const sampleWithPartialData: IPromotion = {
  id: 7418,
  name: 'paralyse',
  type: 'FIXED',
  value: 9914.85,
  startAt: dayjs('2025-09-09T05:46'),
  endAt: dayjs('2025-09-08T16:50'),
  active: false,
};

export const sampleWithFullData: IPromotion = {
  id: 16704,
  name: 'pish',
  type: 'FIXED',
  value: 11266.95,
  startAt: dayjs('2025-09-09T04:03'),
  endAt: dayjs('2025-09-09T02:05'),
  active: false,
};

export const sampleWithNewData: NewPromotion = {
  name: 'quizzically pomelo',
  type: 'FIXED',
  value: 10501.15,
  startAt: dayjs('2025-09-08T21:52'),
  endAt: dayjs('2025-09-09T04:33'),
  active: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
