import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../notification-receipt.test-samples';

import { NotificationReceiptFormService } from './notification-receipt-form.service';

describe('NotificationReceipt Form Service', () => {
  let service: NotificationReceiptFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationReceiptFormService);
  });

  describe('Service methods', () => {
    describe('createNotificationReceiptFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNotificationReceiptFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isRead: expect.any(Object),
            deliveredAt: expect.any(Object),
            readAt: expect.any(Object),
            notification: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });

      it('passing INotificationReceipt should create a new form with FormGroup', () => {
        const formGroup = service.createNotificationReceiptFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            isRead: expect.any(Object),
            deliveredAt: expect.any(Object),
            readAt: expect.any(Object),
            notification: expect.any(Object),
            customer: expect.any(Object),
          }),
        );
      });
    });

    describe('getNotificationReceipt', () => {
      it('should return NewNotificationReceipt for default NotificationReceipt initial value', () => {
        const formGroup = service.createNotificationReceiptFormGroup(sampleWithNewData);

        const notificationReceipt = service.getNotificationReceipt(formGroup) as any;

        expect(notificationReceipt).toMatchObject(sampleWithNewData);
      });

      it('should return NewNotificationReceipt for empty NotificationReceipt initial value', () => {
        const formGroup = service.createNotificationReceiptFormGroup();

        const notificationReceipt = service.getNotificationReceipt(formGroup) as any;

        expect(notificationReceipt).toMatchObject({});
      });

      it('should return INotificationReceipt', () => {
        const formGroup = service.createNotificationReceiptFormGroup(sampleWithRequiredData);

        const notificationReceipt = service.getNotificationReceipt(formGroup) as any;

        expect(notificationReceipt).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INotificationReceipt should not enable id FormControl', () => {
        const formGroup = service.createNotificationReceiptFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNotificationReceipt should disable id FormControl', () => {
        const formGroup = service.createNotificationReceiptFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
