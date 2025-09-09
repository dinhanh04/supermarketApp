import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INotificationReceipt } from '../notification-receipt.model';
import { NotificationReceiptService } from '../service/notification-receipt.service';

const notificationReceiptResolve = (route: ActivatedRouteSnapshot): Observable<null | INotificationReceipt> => {
  const id = route.params.id;
  if (id) {
    return inject(NotificationReceiptService)
      .find(id)
      .pipe(
        mergeMap((notificationReceipt: HttpResponse<INotificationReceipt>) => {
          if (notificationReceipt.body) {
            return of(notificationReceipt.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default notificationReceiptResolve;
