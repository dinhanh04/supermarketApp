import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { PromotionService } from '../service/promotion.service';
import { IPromotion } from '../promotion.model';
import { PromotionFormService } from './promotion-form.service';

import { PromotionUpdateComponent } from './promotion-update.component';

describe('Promotion Management Update Component', () => {
  let comp: PromotionUpdateComponent;
  let fixture: ComponentFixture<PromotionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let promotionFormService: PromotionFormService;
  let promotionService: PromotionService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PromotionUpdateComponent],
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
      .overrideTemplate(PromotionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PromotionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    promotionFormService = TestBed.inject(PromotionFormService);
    promotionService = TestBed.inject(PromotionService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Product query and add missing value', () => {
      const promotion: IPromotion = { id: 21560 };
      const products: IProduct[] = [{ id: 21536 }];
      promotion.products = products;

      const productCollection: IProduct[] = [{ id: 21536 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [...products];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ promotion });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining),
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const promotion: IPromotion = { id: 21560 };
      const products: IProduct = { id: 21536 };
      promotion.products = [products];

      activatedRoute.data = of({ promotion });
      comp.ngOnInit();

      expect(comp.productsSharedCollection).toContainEqual(products);
      expect(comp.promotion).toEqual(promotion);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPromotion>>();
      const promotion = { id: 30739 };
      jest.spyOn(promotionFormService, 'getPromotion').mockReturnValue(promotion);
      jest.spyOn(promotionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ promotion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: promotion }));
      saveSubject.complete();

      // THEN
      expect(promotionFormService.getPromotion).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(promotionService.update).toHaveBeenCalledWith(expect.objectContaining(promotion));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPromotion>>();
      const promotion = { id: 30739 };
      jest.spyOn(promotionFormService, 'getPromotion').mockReturnValue({ id: null });
      jest.spyOn(promotionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ promotion: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: promotion }));
      saveSubject.complete();

      // THEN
      expect(promotionFormService.getPromotion).toHaveBeenCalled();
      expect(promotionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPromotion>>();
      const promotion = { id: 30739 };
      jest.spyOn(promotionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ promotion });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(promotionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduct', () => {
      it('should forward to productService', () => {
        const entity = { id: 21536 };
        const entity2 = { id: 11926 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
