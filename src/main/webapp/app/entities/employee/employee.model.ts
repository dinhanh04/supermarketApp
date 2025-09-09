import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { IDepartment } from 'app/entities/department/department.model';
import { EmployeeRole } from 'app/entities/enumerations/employee-role.model';

export interface IEmployee {
  id: number;
  code?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  role?: keyof typeof EmployeeRole | null;
  hiredAt?: dayjs.Dayjs | null;
  active?: boolean | null;
  user?: Pick<IUser, 'id' | 'login'> | null;
  department?: Pick<IDepartment, 'id'> | null;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
