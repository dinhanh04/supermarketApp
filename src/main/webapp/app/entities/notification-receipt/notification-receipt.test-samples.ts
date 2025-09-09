import dayjs from 'dayjs/esm';

import { INotificationReceipt, NewNotificationReceipt } from './notification-receipt.model';

export const sampleWithRequiredData: INotificationReceipt = {
  id: 28260,
};

export const sampleWithPartialData: INotificationReceipt = {
  id: 18401,
};

export const sampleWithFullData: INotificationReceipt = {
  id: 10149,
  isRead: false,
  deliveredAt: dayjs('2025-09-09T01:06'),
  readAt: dayjs('2025-09-09T00:03'),
};

export const sampleWithNewData: NewNotificationReceipt = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
