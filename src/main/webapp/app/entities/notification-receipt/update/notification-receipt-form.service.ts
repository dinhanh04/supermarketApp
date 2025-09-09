import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { INotificationReceipt, NewNotificationReceipt } from '../notification-receipt.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INotificationReceipt for edit and NewNotificationReceiptFormGroupInput for create.
 */
type NotificationReceiptFormGroupInput = INotificationReceipt | PartialWithRequiredKeyOf<NewNotificationReceipt>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends INotificationReceipt | NewNotificationReceipt> = Omit<T, 'deliveredAt' | 'readAt'> & {
  deliveredAt?: string | null;
  readAt?: string | null;
};

type NotificationReceiptFormRawValue = FormValueOf<INotificationReceipt>;

type NewNotificationReceiptFormRawValue = FormValueOf<NewNotificationReceipt>;

type NotificationReceiptFormDefaults = Pick<NewNotificationReceipt, 'id' | 'isRead' | 'deliveredAt' | 'readAt'>;

type NotificationReceiptFormGroupContent = {
  id: FormControl<NotificationReceiptFormRawValue['id'] | NewNotificationReceipt['id']>;
  isRead: FormControl<NotificationReceiptFormRawValue['isRead']>;
  deliveredAt: FormControl<NotificationReceiptFormRawValue['deliveredAt']>;
  readAt: FormControl<NotificationReceiptFormRawValue['readAt']>;
  notification: FormControl<NotificationReceiptFormRawValue['notification']>;
  customer: FormControl<NotificationReceiptFormRawValue['customer']>;
};

export type NotificationReceiptFormGroup = FormGroup<NotificationReceiptFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NotificationReceiptFormService {
  createNotificationReceiptFormGroup(notificationReceipt: NotificationReceiptFormGroupInput = { id: null }): NotificationReceiptFormGroup {
    const notificationReceiptRawValue = this.convertNotificationReceiptToNotificationReceiptRawValue({
      ...this.getFormDefaults(),
      ...notificationReceipt,
    });
    return new FormGroup<NotificationReceiptFormGroupContent>({
      id: new FormControl(
        { value: notificationReceiptRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      isRead: new FormControl(notificationReceiptRawValue.isRead),
      deliveredAt: new FormControl(notificationReceiptRawValue.deliveredAt),
      readAt: new FormControl(notificationReceiptRawValue.readAt),
      notification: new FormControl(notificationReceiptRawValue.notification, {
        validators: [Validators.required],
      }),
      customer: new FormControl(notificationReceiptRawValue.customer, {
        validators: [Validators.required],
      }),
    });
  }

  getNotificationReceipt(form: NotificationReceiptFormGroup): INotificationReceipt | NewNotificationReceipt {
    return this.convertNotificationReceiptRawValueToNotificationReceipt(
      form.getRawValue() as NotificationReceiptFormRawValue | NewNotificationReceiptFormRawValue,
    );
  }

  resetForm(form: NotificationReceiptFormGroup, notificationReceipt: NotificationReceiptFormGroupInput): void {
    const notificationReceiptRawValue = this.convertNotificationReceiptToNotificationReceiptRawValue({
      ...this.getFormDefaults(),
      ...notificationReceipt,
    });
    form.reset(
      {
        ...notificationReceiptRawValue,
        id: { value: notificationReceiptRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NotificationReceiptFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      isRead: false,
      deliveredAt: currentTime,
      readAt: currentTime,
    };
  }

  private convertNotificationReceiptRawValueToNotificationReceipt(
    rawNotificationReceipt: NotificationReceiptFormRawValue | NewNotificationReceiptFormRawValue,
  ): INotificationReceipt | NewNotificationReceipt {
    return {
      ...rawNotificationReceipt,
      deliveredAt: dayjs(rawNotificationReceipt.deliveredAt, DATE_TIME_FORMAT),
      readAt: dayjs(rawNotificationReceipt.readAt, DATE_TIME_FORMAT),
    };
  }

  private convertNotificationReceiptToNotificationReceiptRawValue(
    notificationReceipt: INotificationReceipt | (Partial<NewNotificationReceipt> & NotificationReceiptFormDefaults),
  ): NotificationReceiptFormRawValue | PartialWithRequiredKeyOf<NewNotificationReceiptFormRawValue> {
    return {
      ...notificationReceipt,
      deliveredAt: notificationReceipt.deliveredAt ? notificationReceipt.deliveredAt.format(DATE_TIME_FORMAT) : undefined,
      readAt: notificationReceipt.readAt ? notificationReceipt.readAt.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
