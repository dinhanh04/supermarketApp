import dayjs from 'dayjs/esm';

import { INotification, NewNotification } from './notification.model';

export const sampleWithRequiredData: INotification = {
  id: 10110,
  title: 'reclassify makeover',
  content: '../fake-data/blob/hipster.txt',
  audience: 'ALL',
  channel: 'SMS',
};

export const sampleWithPartialData: INotification = {
  id: 24804,
  title: 'ha',
  content: '../fake-data/blob/hipster.txt',
  audience: 'CUSTOMER',
  channel: 'EMAIL',
};

export const sampleWithFullData: INotification = {
  id: 5787,
  title: 'some extra-large',
  content: '../fake-data/blob/hipster.txt',
  audience: 'ALL',
  channel: 'EMAIL',
  sentAt: dayjs('2025-09-09T05:59'),
};

export const sampleWithNewData: NewNotification = {
  title: 'consequently voluntarily ew',
  content: '../fake-data/blob/hipster.txt',
  audience: 'STAFF',
  channel: 'IN_APP',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
