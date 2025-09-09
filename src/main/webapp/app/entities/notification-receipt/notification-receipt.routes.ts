import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import NotificationReceiptResolve from './route/notification-receipt-routing-resolve.service';

const notificationReceiptRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/notification-receipt.component').then(m => m.NotificationReceiptComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/notification-receipt-detail.component').then(m => m.NotificationReceiptDetailComponent),
    resolve: {
      notificationReceipt: NotificationReceiptResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/notification-receipt-update.component').then(m => m.NotificationReceiptUpdateComponent),
    resolve: {
      notificationReceipt: NotificationReceiptResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/notification-receipt-update.component').then(m => m.NotificationReceiptUpdateComponent),
    resolve: {
      notificationReceipt: NotificationReceiptResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default notificationReceiptRoute;
