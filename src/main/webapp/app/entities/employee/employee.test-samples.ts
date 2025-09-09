import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 8899,
  code: 'blushing institute',
  fullName: 'requirement catalyst glossy',
  email: 'u=(*H@k)Odx.ThU*ZZ',
  role: 'ADMIN',
  active: false,
};

export const sampleWithPartialData: IEmployee = {
  id: 4463,
  code: 'simple',
  fullName: 'silently',
  email: '4@<=.5}ud?',
  phone: '748.202.7922 x895',
  role: 'STAFF',
  hiredAt: dayjs('2025-09-08'),
  active: true,
};

export const sampleWithFullData: IEmployee = {
  id: 19019,
  code: 'sharply questionably softly',
  fullName: 'yak near',
  email: 'f5@/M1P|._?+.`',
  phone: '734-736-8630 x953',
  role: 'STAFF',
  hiredAt: dayjs('2025-09-09'),
  active: false,
};

export const sampleWithNewData: NewEmployee = {
  code: 'unless',
  fullName: 'annually whenever boo',
  email: 's9}@H.hp',
  role: 'STAFF',
  active: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
