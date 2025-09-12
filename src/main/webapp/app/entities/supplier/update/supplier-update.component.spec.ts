import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IStore } from 'app/entities/store/store.model';
import { StoreService } from 'app/entities/store/service/store.service';
import { SupplierService } from '../service/supplier.service';
import { ISupplier } from '../supplier.model';
import { SupplierFormService } from './supplier-form.service';

import { SupplierUpdateComponent } from './supplier-update.component';

describe('Supplier Management Update Component', () => {
  let comp: SupplierUpdateComponent;
  let fixture: ComponentFixture<SupplierUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let supplierFormService: SupplierFormService;
  let supplierService: SupplierService;
  let storeService: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SupplierUpdateComponent],
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
      .overrideTemplate(SupplierUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SupplierUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    supplierFormService = TestBed.inject(SupplierFormService);
    supplierService = TestBed.inject(SupplierService);
    storeService = TestBed.inject(StoreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Store query and add missing value', () => {
      const supplier: ISupplier = { id: 5063 };
      const stores: IStore[] = [{ id: 2449 }];
      supplier.stores = stores;

      const storeCollection: IStore[] = [{ id: 2449 }];
      jest.spyOn(storeService, 'query').mockReturnValue(of(new HttpResponse({ body: storeCollection })));
      const additionalStores = [...stores];
      const expectedCollection: IStore[] = [...additionalStores, ...storeCollection];
      jest.spyOn(storeService, 'addStoreToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      expect(storeService.query).toHaveBeenCalled();
      expect(storeService.addStoreToCollectionIfMissing).toHaveBeenCalledWith(
        storeCollection,
        ...additionalStores.map(expect.objectContaining),
      );
      expect(comp.storesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const supplier: ISupplier = { id: 5063 };
      const stores: IStore = { id: 2449 };
      supplier.stores = [stores];

      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      expect(comp.storesSharedCollection).toContainEqual(stores);
      expect(comp.supplier).toEqual(supplier);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplier>>();
      const supplier = { id: 28889 };
      jest.spyOn(supplierFormService, 'getSupplier').mockReturnValue(supplier);
      jest.spyOn(supplierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplier }));
      saveSubject.complete();

      // THEN
      expect(supplierFormService.getSupplier).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(supplierService.update).toHaveBeenCalledWith(expect.objectContaining(supplier));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplier>>();
      const supplier = { id: 28889 };
      jest.spyOn(supplierFormService, 'getSupplier').mockReturnValue({ id: null });
      jest.spyOn(supplierService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplier: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: supplier }));
      saveSubject.complete();

      // THEN
      expect(supplierFormService.getSupplier).toHaveBeenCalled();
      expect(supplierService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISupplier>>();
      const supplier = { id: 28889 };
      jest.spyOn(supplierService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ supplier });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(supplierService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareStore', () => {
      it('should forward to storeService', () => {
        const entity = { id: 2449 };
        const entity2 = { id: 28576 };
        jest.spyOn(storeService, 'compareStore');
        comp.compareStore(entity, entity2);
        expect(storeService.compareStore).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
