import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ICustomerOrder } from '../customer-order.model';
import { CustomerOrderService } from '../service/customer-order.service';
import { CustomerOrderFormService } from './customer-order-form.service';

import { CustomerOrderUpdateComponent } from './customer-order-update.component';

describe('CustomerOrder Management Update Component', () => {
  let comp: CustomerOrderUpdateComponent;
  let fixture: ComponentFixture<CustomerOrderUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let customerOrderFormService: CustomerOrderFormService;
  let customerOrderService: CustomerOrderService;
  let customerService: CustomerService;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomerOrderUpdateComponent],
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
      .overrideTemplate(CustomerOrderUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CustomerOrderUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    customerOrderFormService = TestBed.inject(CustomerOrderFormService);
    customerOrderService = TestBed.inject(CustomerOrderService);
    customerService = TestBed.inject(CustomerService);
    employeeService = TestBed.inject(EmployeeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Customer query and add missing value', () => {
      const customerOrder: ICustomerOrder = { id: 9643 };
      const customer: ICustomer = { id: 26915 };
      customerOrder.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 26915 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ customerOrder });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(
        customerCollection,
        ...additionalCustomers.map(expect.objectContaining),
      );
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('should call Employee query and add missing value', () => {
      const customerOrder: ICustomerOrder = { id: 9643 };
      const salesBy: IEmployee = { id: 1749 };
      customerOrder.salesBy = salesBy;

      const employeeCollection: IEmployee[] = [{ id: 1749 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployees = [salesBy];
      const expectedCollection: IEmployee[] = [...additionalEmployees, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ customerOrder });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployees.map(expect.objectContaining),
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const customerOrder: ICustomerOrder = { id: 9643 };
      const customer: ICustomer = { id: 26915 };
      customerOrder.customer = customer;
      const salesBy: IEmployee = { id: 1749 };
      customerOrder.salesBy = salesBy;

      activatedRoute.data = of({ customerOrder });
      comp.ngOnInit();

      expect(comp.customersSharedCollection).toContainEqual(customer);
      expect(comp.employeesSharedCollection).toContainEqual(salesBy);
      expect(comp.customerOrder).toEqual(customerOrder);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerOrder>>();
      const customerOrder = { id: 18791 };
      jest.spyOn(customerOrderFormService, 'getCustomerOrder').mockReturnValue(customerOrder);
      jest.spyOn(customerOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerOrder }));
      saveSubject.complete();

      // THEN
      expect(customerOrderFormService.getCustomerOrder).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(customerOrderService.update).toHaveBeenCalledWith(expect.objectContaining(customerOrder));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerOrder>>();
      const customerOrder = { id: 18791 };
      jest.spyOn(customerOrderFormService, 'getCustomerOrder').mockReturnValue({ id: null });
      jest.spyOn(customerOrderService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerOrder: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: customerOrder }));
      saveSubject.complete();

      // THEN
      expect(customerOrderFormService.getCustomerOrder).toHaveBeenCalled();
      expect(customerOrderService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICustomerOrder>>();
      const customerOrder = { id: 18791 };
      jest.spyOn(customerOrderService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ customerOrder });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(customerOrderService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCustomer', () => {
      it('should forward to customerService', () => {
        const entity = { id: 26915 };
        const entity2 = { id: 21032 };
        jest.spyOn(customerService, 'compareCustomer');
        comp.compareCustomer(entity, entity2);
        expect(customerService.compareCustomer).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareEmployee', () => {
      it('should forward to employeeService', () => {
        const entity = { id: 1749 };
        const entity2 = { id: 1545 };
        jest.spyOn(employeeService, 'compareEmployee');
        comp.compareEmployee(entity, entity2);
        expect(employeeService.compareEmployee).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
