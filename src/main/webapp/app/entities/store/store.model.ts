import dayjs from 'dayjs/esm';

export interface IStore {
  id: number;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  openingHours?: string | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
}

export type NewStore = Omit<IStore, 'id'> & { id: null };
