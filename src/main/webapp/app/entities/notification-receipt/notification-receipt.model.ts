import dayjs from 'dayjs/esm';
import { INotification } from 'app/entities/notification/notification.model';
import { ICustomer } from 'app/entities/customer/customer.model';

export interface INotificationReceipt {
  id: number;
  isRead?: boolean | null;
  deliveredAt?: dayjs.Dayjs | null;
  readAt?: dayjs.Dayjs | null;
  notification?: Pick<INotification, 'id'> | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewNotificationReceipt = Omit<INotificationReceipt, 'id'> & { id: null };
