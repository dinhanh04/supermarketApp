import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ISupplier } from 'app/entities/supplier/supplier.model';
import { SupplierService } from 'app/entities/supplier/service/supplier.service';
import { StoreService } from '../service/store.service';
import { IStore } from '../store.model';
import { StoreFormService } from './store-form.service';

import { StoreUpdateComponent } from './store-update.component';

describe('Store Management Update Component', () => {
  let comp: StoreUpdateComponent;
  let fixture: ComponentFixture<StoreUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let storeFormService: StoreFormService;
  let storeService: StoreService;
  let supplierService: SupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreUpdateComponent],
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
      .overrideTemplate(StoreUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(StoreUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    storeFormService = TestBed.inject(StoreFormService);
    storeService = TestBed.inject(StoreService);
    supplierService = TestBed.inject(SupplierService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Supplier query and add missing value', () => {
      const store: IStore = { id: 28576 };
      const suppliers: ISupplier[] = [{ id: 28889 }];
      store.suppliers = suppliers;

      const supplierCollection: ISupplier[] = [{ id: 28889 }];
      jest.spyOn(supplierService, 'query').mockReturnValue(of(new HttpResponse({ body: supplierCollection })));
      const additionalSuppliers = [...suppliers];
      const expectedCollection: ISupplier[] = [...additionalSuppliers, ...supplierCollection];
      jest.spyOn(supplierService, 'addSupplierToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ store });
      comp.ngOnInit();

      expect(supplierService.query).toHaveBeenCalled();
      expect(supplierService.addSupplierToCollectionIfMissing).toHaveBeenCalledWith(
        supplierCollection,
        ...additionalSuppliers.map(expect.objectContaining),
      );
      expect(comp.suppliersSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const store: IStore = { id: 28576 };
      const suppliers: ISupplier = { id: 28889 };
      store.suppliers = [suppliers];

      activatedRoute.data = of({ store });
      comp.ngOnInit();

      expect(comp.suppliersSharedCollection).toContainEqual(suppliers);
      expect(comp.store).toEqual(store);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStore>>();
      const store = { id: 2449 };
      jest.spyOn(storeFormService, 'getStore').mockReturnValue(store);
      jest.spyOn(storeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ store });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: store }));
      saveSubject.complete();

      // THEN
      expect(storeFormService.getStore).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(storeService.update).toHaveBeenCalledWith(expect.objectContaining(store));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStore>>();
      const store = { id: 2449 };
      jest.spyOn(storeFormService, 'getStore').mockReturnValue({ id: null });
      jest.spyOn(storeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ store: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: store }));
      saveSubject.complete();

      // THEN
      expect(storeFormService.getStore).toHaveBeenCalled();
      expect(storeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IStore>>();
      const store = { id: 2449 };
      jest.spyOn(storeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ store });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(storeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSupplier', () => {
      it('should forward to supplierService', () => {
        const entity = { id: 28889 };
        const entity2 = { id: 5063 };
        jest.spyOn(supplierService, 'compareSupplier');
        comp.compareSupplier(entity, entity2);
        expect(supplierService.compareSupplier).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
