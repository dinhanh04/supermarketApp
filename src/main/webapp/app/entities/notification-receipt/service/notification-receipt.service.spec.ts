import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { INotificationReceipt } from '../notification-receipt.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../notification-receipt.test-samples';

import { NotificationReceiptService, RestNotificationReceipt } from './notification-receipt.service';

const requireRestSample: RestNotificationReceipt = {
  ...sampleWithRequiredData,
  deliveredAt: sampleWithRequiredData.deliveredAt?.toJSON(),
  readAt: sampleWithRequiredData.readAt?.toJSON(),
};

describe('NotificationReceipt Service', () => {
  let service: NotificationReceiptService;
  let httpMock: HttpTestingController;
  let expectedResult: INotificationReceipt | INotificationReceipt[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(NotificationReceiptService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a NotificationReceipt', () => {
      const notificationReceipt = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(notificationReceipt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NotificationReceipt', () => {
      const notificationReceipt = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(notificationReceipt).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NotificationReceipt', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NotificationReceipt', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a NotificationReceipt', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNotificationReceiptToCollectionIfMissing', () => {
      it('should add a NotificationReceipt to an empty array', () => {
        const notificationReceipt: INotificationReceipt = sampleWithRequiredData;
        expectedResult = service.addNotificationReceiptToCollectionIfMissing([], notificationReceipt);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(notificationReceipt);
      });

      it('should not add a NotificationReceipt to an array that contains it', () => {
        const notificationReceipt: INotificationReceipt = sampleWithRequiredData;
        const notificationReceiptCollection: INotificationReceipt[] = [
          {
            ...notificationReceipt,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNotificationReceiptToCollectionIfMissing(notificationReceiptCollection, notificationReceipt);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NotificationReceipt to an array that doesn't contain it", () => {
        const notificationReceipt: INotificationReceipt = sampleWithRequiredData;
        const notificationReceiptCollection: INotificationReceipt[] = [sampleWithPartialData];
        expectedResult = service.addNotificationReceiptToCollectionIfMissing(notificationReceiptCollection, notificationReceipt);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(notificationReceipt);
      });

      it('should add only unique NotificationReceipt to an array', () => {
        const notificationReceiptArray: INotificationReceipt[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const notificationReceiptCollection: INotificationReceipt[] = [sampleWithRequiredData];
        expectedResult = service.addNotificationReceiptToCollectionIfMissing(notificationReceiptCollection, ...notificationReceiptArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const notificationReceipt: INotificationReceipt = sampleWithRequiredData;
        const notificationReceipt2: INotificationReceipt = sampleWithPartialData;
        expectedResult = service.addNotificationReceiptToCollectionIfMissing([], notificationReceipt, notificationReceipt2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(notificationReceipt);
        expect(expectedResult).toContain(notificationReceipt2);
      });

      it('should accept null and undefined values', () => {
        const notificationReceipt: INotificationReceipt = sampleWithRequiredData;
        expectedResult = service.addNotificationReceiptToCollectionIfMissing([], null, notificationReceipt, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(notificationReceipt);
      });

      it('should return initial array if no NotificationReceipt is added', () => {
        const notificationReceiptCollection: INotificationReceipt[] = [sampleWithRequiredData];
        expectedResult = service.addNotificationReceiptToCollectionIfMissing(notificationReceiptCollection, undefined, null);
        expect(expectedResult).toEqual(notificationReceiptCollection);
      });
    });

    describe('compareNotificationReceipt', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNotificationReceipt(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 11949 };
        const entity2 = null;

        const compareResult1 = service.compareNotificationReceipt(entity1, entity2);
        const compareResult2 = service.compareNotificationReceipt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 11949 };
        const entity2 = { id: 6623 };

        const compareResult1 = service.compareNotificationReceipt(entity1, entity2);
        const compareResult2 = service.compareNotificationReceipt(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 11949 };
        const entity2 = { id: 11949 };

        const compareResult1 = service.compareNotificationReceipt(entity1, entity2);
        const compareResult2 = service.compareNotificationReceipt(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
