import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';
import { IEmployee } from 'app/entities/employee/employee.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';

export interface ICustomerOrder {
  id: number;
  code?: string | null;
  orderDate?: dayjs.Dayjs | null;
  status?: keyof typeof OrderStatus | null;
  totalAmount?: number | null;
  paymentMethod?: keyof typeof PaymentMethod | null;
  shippingAddress?: string | null;
  note?: string | null;
  customer?: Pick<ICustomer, 'id' | 'code'> | null;
  salesBy?: Pick<IEmployee, 'id' | 'fullName'> | null;
}

export type NewCustomerOrder = Omit<ICustomerOrder, 'id'> & { id: null };
