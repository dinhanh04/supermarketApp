import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { INotification } from 'app/entities/notification/notification.model';
import { NotificationService } from 'app/entities/notification/service/notification.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { INotificationReceipt } from '../notification-receipt.model';
import { NotificationReceiptService } from '../service/notification-receipt.service';
import { NotificationReceiptFormService } from './notification-receipt-form.service';

import { NotificationReceiptUpdateComponent } from './notification-receipt-update.component';

describe('NotificationReceipt Management Update Component', () => {
  let comp: NotificationReceiptUpdateComponent;
  let fixture: ComponentFixture<NotificationReceiptUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let notificationReceiptFormService: NotificationReceiptFormService;
  let notificationReceiptService: NotificationReceiptService;
  let notificationService: NotificationService;
  let customerService: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationReceiptUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(NotificationReceiptUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NotificationReceiptUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    notificationReceiptFormService = TestBed.inject(NotificationReceiptFormService);
    notificationReceiptService = TestBed.inject(NotificationReceiptService);
    notificationService = TestBed.inject(NotificationService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Notification query and add missing value', () => {
      const notificationReceipt: INotificationReceipt = { id: 6623 };
      const notification: INotification = { id: 16124 };
      notificationReceipt.notification = notification;

      const notificationCollection: INotification[] = [{ id: 16124 }];
      jest.spyOn(notificationService, 'query').mockReturnValue(of(new HttpResponse({ body: notificationCollection })));
      const additionalNotifications = [notification];
      const expectedCollection: INotification[] = [...additionalNotifications, ...notificationCollection];
      jest.spyOn(notificationService, 'addNotificationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notificationReceipt });
      comp.ngOnInit();

      expect(notificationService.query).toHaveBeenCalled();
      expect(notificationService.addNotificationToCollectionIfMissing).toHaveBeenCalledWith(
        notificationCollection,
        ...additionalNotifications.map(expect.objectContaining),
      );
      expect(comp.notificationsSharedCollection).toEqual(expectedCollection);
    });

    it('should call Customer query and add missing value', () => {
      const notificationReceipt: INotificationReceipt = { id: 6623 };
      const customer: ICustomer = { id: 26915 };
      notificationReceipt.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 26915 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ notificationReceipt });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(expect.objectContaining),
      );
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const notificationReceipt: INotificationReceipt = { id: 6623 };
      const notification: INotification = { id: 16124 };
      notificationReceipt.notification = notification;
      const customer: ICustomer = { id: 26915 };
      notificationReceipt.customer = customer;

      activatedRoute.data = of({ notificationReceipt });
      comp.ngOnInit();

      expect(comp.notificationsSharedCollection).toContainEqual(notification);
      expect(comp.customersSharedCollection).toContainEqual(customer);
      expect(comp.notificationReceipt).toEqual(notificationReceipt);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INotificationReceipt>>();
      const notificationReceipt = { id: 11949 };
      jest.spyOn(notificationReceiptFormService, 'getNotificationReceipt').mockReturnValue(notificationReceipt);
      jest.spyOn(notificationReceiptService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notificationReceipt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: notificationReceipt }));
      saveSubject.complete();

      // THEN
      expect(notificationReceiptFormService.getNotificationReceipt).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(notificationReceiptService.update).toHaveBeenCalledWith(expect.objectContaining(notificationReceipt));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INotificationReceipt>>();
      const notificationReceipt = { id: 11949 };
      jest.spyOn(notificationReceiptFormService, 'getNotificationReceipt').mockReturnValue({ id: null });
      jest.spyOn(notificationReceiptService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notificationReceipt: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: notificationReceipt }));
      saveSubject.complete();

      // THEN
      expect(notificationReceiptFormService.getNotificationReceipt).toHaveBeenCalled();
      expect(notificationReceiptService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INotificationReceipt>>();
      const notificationReceipt = { id: 11949 };
      jest.spyOn(notificationReceiptService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ notificationReceipt });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(notificationReceiptService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareNotification', () => {
      it('should forward to notificationService', () => {
        const entity = { id: 16124 };
        const entity2 = { id: 16244 };
        jest.spyOn(notificationService, 'compareNotification');
        comp.compareNotification(entity, entity2);
        expect(notificationService.compareNotification).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCustomer', () => {
      it('should forward to customerService', () => {
        const entity = { id: 26915 };
        const entity2 = { id: 21032 };
        jest.spyOn(customerService, 'compareCustomer');
        comp.compareCustomer(entity, entity2);
        expect(customerService.compareCustomer).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
