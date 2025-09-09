import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INotification } from 'app/entities/notification/notification.model';
import { NotificationService } from 'app/entities/notification/service/notification.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { NotificationReceiptService } from '../service/notification-receipt.service';
import { INotificationReceipt } from '../notification-receipt.model';
import { NotificationReceiptFormGroup, NotificationReceiptFormService } from './notification-receipt-form.service';

@Component({
  selector: 'jhi-notification-receipt-update',
  templateUrl: './notification-receipt-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NotificationReceiptUpdateComponent implements OnInit {
  isSaving = false;
  notificationReceipt: INotificationReceipt | null = null;

  notificationsSharedCollection: INotification[] = [];
  customersSharedCollection: ICustomer[] = [];

  protected notificationReceiptService = inject(NotificationReceiptService);
  protected notificationReceiptFormService = inject(NotificationReceiptFormService);
  protected notificationService = inject(NotificationService);
  protected customerService = inject(CustomerService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: NotificationReceiptFormGroup = this.notificationReceiptFormService.createNotificationReceiptFormGroup();

  compareNotification = (o1: INotification | null, o2: INotification | null): boolean =>
    this.notificationService.compareNotification(o1, o2);

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notificationReceipt }) => {
      this.notificationReceipt = notificationReceipt;
      if (notificationReceipt) {
        this.updateForm(notificationReceipt);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notificationReceipt = this.notificationReceiptFormService.getNotificationReceipt(this.editForm);
    if (notificationReceipt.id !== null) {
      this.subscribeToSaveResponse(this.notificationReceiptService.update(notificationReceipt));
    } else {
      this.subscribeToSaveResponse(this.notificationReceiptService.create(notificationReceipt));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotificationReceipt>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(notificationReceipt: INotificationReceipt): void {
    this.notificationReceipt = notificationReceipt;
    this.notificationReceiptFormService.resetForm(this.editForm, notificationReceipt);

    this.notificationsSharedCollection = this.notificationService.addNotificationToCollectionIfMissing<INotification>(
      this.notificationsSharedCollection,
      notificationReceipt.notification,
    );
    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing<ICustomer>(
      this.customersSharedCollection,
      notificationReceipt.customer,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.notificationService
      .query()
      .pipe(map((res: HttpResponse<INotification[]>) => res.body ?? []))
      .pipe(
        map((notifications: INotification[]) =>
          this.notificationService.addNotificationToCollectionIfMissing<INotification>(
            notifications,
            this.notificationReceipt?.notification,
          ),
        ),
      )
      .subscribe((notifications: INotification[]) => (this.notificationsSharedCollection = notifications));

    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.notificationReceipt?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));
  }
}
