import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INotificationReceipt, NewNotificationReceipt } from '../notification-receipt.model';

export type PartialUpdateNotificationReceipt = Partial<INotificationReceipt> & Pick<INotificationReceipt, 'id'>;

type RestOf<T extends INotificationReceipt | NewNotificationReceipt> = Omit<T, 'deliveredAt' | 'readAt'> & {
  deliveredAt?: string | null;
  readAt?: string | null;
};

export type RestNotificationReceipt = RestOf<INotificationReceipt>;

export type NewRestNotificationReceipt = RestOf<NewNotificationReceipt>;

export type PartialUpdateRestNotificationReceipt = RestOf<PartialUpdateNotificationReceipt>;

export type EntityResponseType = HttpResponse<INotificationReceipt>;
export type EntityArrayResponseType = HttpResponse<INotificationReceipt[]>;

@Injectable({ providedIn: 'root' })
export class NotificationReceiptService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/notification-receipts');

  create(notificationReceipt: NewNotificationReceipt): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notificationReceipt);
    return this.http
      .post<RestNotificationReceipt>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(notificationReceipt: INotificationReceipt): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notificationReceipt);
    return this.http
      .put<RestNotificationReceipt>(`${this.resourceUrl}/${this.getNotificationReceiptIdentifier(notificationReceipt)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(notificationReceipt: PartialUpdateNotificationReceipt): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(notificationReceipt);
    return this.http
      .patch<RestNotificationReceipt>(`${this.resourceUrl}/${this.getNotificationReceiptIdentifier(notificationReceipt)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestNotificationReceipt>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestNotificationReceipt[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNotificationReceiptIdentifier(notificationReceipt: Pick<INotificationReceipt, 'id'>): number {
    return notificationReceipt.id;
  }

  compareNotificationReceipt(o1: Pick<INotificationReceipt, 'id'> | null, o2: Pick<INotificationReceipt, 'id'> | null): boolean {
    return o1 && o2 ? this.getNotificationReceiptIdentifier(o1) === this.getNotificationReceiptIdentifier(o2) : o1 === o2;
  }

  addNotificationReceiptToCollectionIfMissing<Type extends Pick<INotificationReceipt, 'id'>>(
    notificationReceiptCollection: Type[],
    ...notificationReceiptsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const notificationReceipts: Type[] = notificationReceiptsToCheck.filter(isPresent);
    if (notificationReceipts.length > 0) {
      const notificationReceiptCollectionIdentifiers = notificationReceiptCollection.map(notificationReceiptItem =>
        this.getNotificationReceiptIdentifier(notificationReceiptItem),
      );
      const notificationReceiptsToAdd = notificationReceipts.filter(notificationReceiptItem => {
        const notificationReceiptIdentifier = this.getNotificationReceiptIdentifier(notificationReceiptItem);
        if (notificationReceiptCollectionIdentifiers.includes(notificationReceiptIdentifier)) {
          return false;
        }
        notificationReceiptCollectionIdentifiers.push(notificationReceiptIdentifier);
        return true;
      });
      return [...notificationReceiptsToAdd, ...notificationReceiptCollection];
    }
    return notificationReceiptCollection;
  }

  protected convertDateFromClient<T extends INotificationReceipt | NewNotificationReceipt | PartialUpdateNotificationReceipt>(
    notificationReceipt: T,
  ): RestOf<T> {
    return {
      ...notificationReceipt,
      deliveredAt: notificationReceipt.deliveredAt?.toJSON() ?? null,
      readAt: notificationReceipt.readAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restNotificationReceipt: RestNotificationReceipt): INotificationReceipt {
    return {
      ...restNotificationReceipt,
      deliveredAt: restNotificationReceipt.deliveredAt ? dayjs(restNotificationReceipt.deliveredAt) : undefined,
      readAt: restNotificationReceipt.readAt ? dayjs(restNotificationReceipt.readAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestNotificationReceipt>): HttpResponse<INotificationReceipt> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestNotificationReceipt[]>): HttpResponse<INotificationReceipt[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
