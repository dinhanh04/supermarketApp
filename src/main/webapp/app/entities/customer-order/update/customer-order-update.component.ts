import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { IStore } from 'app/entities/store/store.model';
import { StoreService } from 'app/entities/store/service/store.service';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';
import { CustomerOrderService } from '../service/customer-order.service';
import { ICustomerOrder } from '../customer-order.model';
import { CustomerOrderFormGroup, CustomerOrderFormService } from './customer-order-form.service';

@Component({
  selector: 'jhi-customer-order-update',
  templateUrl: './customer-order-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CustomerOrderUpdateComponent implements OnInit {
  isSaving = false;
  customerOrder: ICustomerOrder | null = null;
  orderStatusValues = Object.keys(OrderStatus);
  paymentMethodValues = Object.keys(PaymentMethod);

  customersSharedCollection: ICustomer[] = [];
  employeesSharedCollection: IEmployee[] = [];
  storesSharedCollection: IStore[] = [];

  protected customerOrderService = inject(CustomerOrderService);
  protected customerOrderFormService = inject(CustomerOrderFormService);
  protected customerService = inject(CustomerService);
  protected employeeService = inject(EmployeeService);
  protected storeService = inject(StoreService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CustomerOrderFormGroup = this.customerOrderFormService.createCustomerOrderFormGroup();

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareStore = (o1: IStore | null, o2: IStore | null): boolean => this.storeService.compareStore(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerOrder }) => {
      this.customerOrder = customerOrder;
      if (customerOrder) {
        this.updateForm(customerOrder);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customerOrder = this.customerOrderFormService.getCustomerOrder(this.editForm);
    if (customerOrder.id !== null) {
      this.subscribeToSaveResponse(this.customerOrderService.update(customerOrder));
    } else {
      this.subscribeToSaveResponse(this.customerOrderService.create(customerOrder));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerOrder>>): void {
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

  protected updateForm(customerOrder: ICustomerOrder): void {
    this.customerOrder = customerOrder;
    this.customerOrderFormService.resetForm(this.editForm, customerOrder);

    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing<ICustomer>(
      this.customersSharedCollection,
      customerOrder.customer,
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      customerOrder.salesBy,
    );
    this.storesSharedCollection = this.storeService.addStoreToCollectionIfMissing<IStore>(this.storesSharedCollection, customerOrder.store);
  }

  protected loadRelationshipsOptions(): void {
    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.customerOrder?.customer),
        ),
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.customerOrder?.salesBy),
        ),
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.storeService
      .query()
      .pipe(map((res: HttpResponse<IStore[]>) => res.body ?? []))
      .pipe(map((stores: IStore[]) => this.storeService.addStoreToCollectionIfMissing<IStore>(stores, this.customerOrder?.store)))
      .subscribe((stores: IStore[]) => (this.storesSharedCollection = stores));
  }
}
