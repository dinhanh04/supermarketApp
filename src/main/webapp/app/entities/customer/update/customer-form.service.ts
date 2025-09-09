import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICustomer, NewCustomer } from '../customer.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomer for edit and NewCustomerFormGroupInput for create.
 */
type CustomerFormGroupInput = ICustomer | PartialWithRequiredKeyOf<NewCustomer>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ICustomer | NewCustomer> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type CustomerFormRawValue = FormValueOf<ICustomer>;

type NewCustomerFormRawValue = FormValueOf<NewCustomer>;

type CustomerFormDefaults = Pick<NewCustomer, 'id' | 'createdAt' | 'updatedAt'>;

type CustomerFormGroupContent = {
  id: FormControl<CustomerFormRawValue['id'] | NewCustomer['id']>;
  code: FormControl<CustomerFormRawValue['code']>;
  firstName: FormControl<CustomerFormRawValue['firstName']>;
  lastName: FormControl<CustomerFormRawValue['lastName']>;
  email: FormControl<CustomerFormRawValue['email']>;
  phone: FormControl<CustomerFormRawValue['phone']>;
  dob: FormControl<CustomerFormRawValue['dob']>;
  gender: FormControl<CustomerFormRawValue['gender']>;
  status: FormControl<CustomerFormRawValue['status']>;
  createdAt: FormControl<CustomerFormRawValue['createdAt']>;
  updatedAt: FormControl<CustomerFormRawValue['updatedAt']>;
  user: FormControl<CustomerFormRawValue['user']>;
};

export type CustomerFormGroup = FormGroup<CustomerFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerFormService {
  createCustomerFormGroup(customer: CustomerFormGroupInput = { id: null }): CustomerFormGroup {
    const customerRawValue = this.convertCustomerToCustomerRawValue({
      ...this.getFormDefaults(),
      ...customer,
    });
    return new FormGroup<CustomerFormGroupContent>({
      id: new FormControl(
        { value: customerRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      code: new FormControl(customerRawValue.code, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(customerRawValue.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(customerRawValue.lastName, {
        validators: [Validators.required],
      }),
      email: new FormControl(customerRawValue.email, {
        validators: [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')],
      }),
      phone: new FormControl(customerRawValue.phone),
      dob: new FormControl(customerRawValue.dob),
      gender: new FormControl(customerRawValue.gender),
      status: new FormControl(customerRawValue.status, {
        validators: [Validators.required],
      }),
      createdAt: new FormControl(customerRawValue.createdAt),
      updatedAt: new FormControl(customerRawValue.updatedAt),
      user: new FormControl(customerRawValue.user, {
        validators: [Validators.required],
      }),
    });
  }

  getCustomer(form: CustomerFormGroup): ICustomer | NewCustomer {
    return this.convertCustomerRawValueToCustomer(form.getRawValue() as CustomerFormRawValue | NewCustomerFormRawValue);
  }

  resetForm(form: CustomerFormGroup, customer: CustomerFormGroupInput): void {
    const customerRawValue = this.convertCustomerToCustomerRawValue({ ...this.getFormDefaults(), ...customer });
    form.reset(
      {
        ...customerRawValue,
        id: { value: customerRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CustomerFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertCustomerRawValueToCustomer(rawCustomer: CustomerFormRawValue | NewCustomerFormRawValue): ICustomer | NewCustomer {
    return {
      ...rawCustomer,
      createdAt: dayjs(rawCustomer.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawCustomer.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertCustomerToCustomerRawValue(
    customer: ICustomer | (Partial<NewCustomer> & CustomerFormDefaults),
  ): CustomerFormRawValue | PartialWithRequiredKeyOf<NewCustomerFormRawValue> {
    return {
      ...customer,
      createdAt: customer.createdAt ? customer.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: customer.updatedAt ? customer.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
