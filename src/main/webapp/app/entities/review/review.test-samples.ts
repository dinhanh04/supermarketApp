import dayjs from 'dayjs/esm';

import { IReview, NewReview } from './review.model';

export const sampleWithRequiredData: IReview = {
  id: 6640,
  rating: 2,
  createdAt: dayjs('2025-09-08T10:33'),
  visible: false,
};

export const sampleWithPartialData: IReview = {
  id: 12934,
  rating: 2,
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-09-08T08:00'),
  visible: false,
};

export const sampleWithFullData: IReview = {
  id: 30916,
  rating: 4,
  title: 'yowza',
  content: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2025-09-08T12:24'),
  visible: true,
};

export const sampleWithNewData: NewReview = {
  rating: 2,
  createdAt: dayjs('2025-09-09T03:32'),
  visible: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
