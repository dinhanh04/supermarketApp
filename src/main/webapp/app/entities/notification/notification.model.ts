import dayjs from 'dayjs/esm';
import { NotificationAudience } from 'app/entities/enumerations/notification-audience.model';
import { NotificationChannel } from 'app/entities/enumerations/notification-channel.model';

export interface INotification {
  id: number;
  title?: string | null;
  content?: string | null;
  audience?: keyof typeof NotificationAudience | null;
  channel?: keyof typeof NotificationChannel | null;
  sentAt?: dayjs.Dayjs | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
