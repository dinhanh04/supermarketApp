import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IStore, NewStore } from '../store.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IStore for edit and NewStoreFormGroupInput for create.
 */
type StoreFormGroupInput = IStore | PartialWithRequiredKeyOf<NewStore>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IStore | NewStore> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

type StoreFormRawValue = FormValueOf<IStore>;

type NewStoreFormRawValue = FormValueOf<NewStore>;

type StoreFormDefaults = Pick<NewStore, 'id' | 'createdAt' | 'updatedAt'>;

type StoreFormGroupContent = {
  id: FormControl<StoreFormRawValue['id'] | NewStore['id']>;
  code: FormControl<StoreFormRawValue['code']>;
  name: FormControl<StoreFormRawValue['name']>;
  description: FormControl<StoreFormRawValue['description']>;
  phone: FormControl<StoreFormRawValue['phone']>;
  email: FormControl<StoreFormRawValue['email']>;
  address: FormControl<StoreFormRawValue['address']>;
  city: FormControl<StoreFormRawValue['city']>;
  country: FormControl<StoreFormRawValue['country']>;
  openingHours: FormControl<StoreFormRawValue['openingHours']>;
  createdAt: FormControl<StoreFormRawValue['createdAt']>;
  updatedAt: FormControl<StoreFormRawValue['updatedAt']>;
};

export type StoreFormGroup = FormGroup<StoreFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class StoreFormService {
  createStoreFormGroup(store: StoreFormGroupInput = { id: null }): StoreFormGroup {
    const storeRawValue = this.convertStoreToStoreRawValue({
      ...this.getFormDefaults(),
      ...store,
    });
    return new FormGroup<StoreFormGroupContent>({
      id: new FormControl(
        { value: storeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      code: new FormControl(storeRawValue.code, {
        validators: [Validators.required],
      }),
      name: new FormControl(storeRawValue.name, {
        validators: [Validators.required],
      }),
      description: new FormControl(storeRawValue.description),
      phone: new FormControl(storeRawValue.phone),
      email: new FormControl(storeRawValue.email, {
        validators: [Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')],
      }),
      address: new FormControl(storeRawValue.address, {
        validators: [Validators.required],
      }),
      city: new FormControl(storeRawValue.city, {
        validators: [Validators.required],
      }),
      country: new FormControl(storeRawValue.country, {
        validators: [Validators.required],
      }),
      openingHours: new FormControl(storeRawValue.openingHours),
      createdAt: new FormControl(storeRawValue.createdAt),
      updatedAt: new FormControl(storeRawValue.updatedAt),
    });
  }

  getStore(form: StoreFormGroup): IStore | NewStore {
    return this.convertStoreRawValueToStore(form.getRawValue() as StoreFormRawValue | NewStoreFormRawValue);
  }

  resetForm(form: StoreFormGroup, store: StoreFormGroupInput): void {
    const storeRawValue = this.convertStoreToStoreRawValue({ ...this.getFormDefaults(), ...store });
    form.reset(
      {
        ...storeRawValue,
        id: { value: storeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): StoreFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdAt: currentTime,
      updatedAt: currentTime,
    };
  }

  private convertStoreRawValueToStore(rawStore: StoreFormRawValue | NewStoreFormRawValue): IStore | NewStore {
    return {
      ...rawStore,
      createdAt: dayjs(rawStore.createdAt, DATE_TIME_FORMAT),
      updatedAt: dayjs(rawStore.updatedAt, DATE_TIME_FORMAT),
    };
  }

  private convertStoreToStoreRawValue(
    store: IStore | (Partial<NewStore> & StoreFormDefaults),
  ): StoreFormRawValue | PartialWithRequiredKeyOf<NewStoreFormRawValue> {
    return {
      ...store,
      createdAt: store.createdAt ? store.createdAt.format(DATE_TIME_FORMAT) : undefined,
      updatedAt: store.updatedAt ? store.updatedAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
