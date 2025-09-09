import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'supermarketApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'customer',
    data: { pageTitle: 'supermarketApp.customer.home.title' },
    loadChildren: () => import('./customer/customer.routes'),
  },
  {
    path: 'address',
    data: { pageTitle: 'supermarketApp.address.home.title' },
    loadChildren: () => import('./address/address.routes'),
  },
  {
    path: 'department',
    data: { pageTitle: 'supermarketApp.department.home.title' },
    loadChildren: () => import('./department/department.routes'),
  },
  {
    path: 'employee',
    data: { pageTitle: 'supermarketApp.employee.home.title' },
    loadChildren: () => import('./employee/employee.routes'),
  },
  {
    path: 'supplier',
    data: { pageTitle: 'supermarketApp.supplier.home.title' },
    loadChildren: () => import('./supplier/supplier.routes'),
  },
  {
    path: 'category',
    data: { pageTitle: 'supermarketApp.category.home.title' },
    loadChildren: () => import('./category/category.routes'),
  },
  {
    path: 'product',
    data: { pageTitle: 'supermarketApp.product.home.title' },
    loadChildren: () => import('./product/product.routes'),
  },
  {
    path: 'promotion',
    data: { pageTitle: 'supermarketApp.promotion.home.title' },
    loadChildren: () => import('./promotion/promotion.routes'),
  },
  {
    path: 'customer-order',
    data: { pageTitle: 'supermarketApp.customerOrder.home.title' },
    loadChildren: () => import('./customer-order/customer-order.routes'),
  },
  {
    path: 'order-item',
    data: { pageTitle: 'supermarketApp.orderItem.home.title' },
    loadChildren: () => import('./order-item/order-item.routes'),
  },
  {
    path: 'review',
    data: { pageTitle: 'supermarketApp.review.home.title' },
    loadChildren: () => import('./review/review.routes'),
  },
  {
    path: 'notification',
    data: { pageTitle: 'supermarketApp.notification.home.title' },
    loadChildren: () => import('./notification/notification.routes'),
  },
  {
    path: 'notification-receipt',
    data: { pageTitle: 'supermarketApp.notificationReceipt.home.title' },
    loadChildren: () => import('./notification-receipt/notification-receipt.routes'),
  },
  {
    path: 'store',
    data: { pageTitle: 'supermarketApp.store.home.title' },
    loadChildren: () => import('./store/store.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
