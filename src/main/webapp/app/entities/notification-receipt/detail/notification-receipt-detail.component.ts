import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { INotificationReceipt } from '../notification-receipt.model';

@Component({
  selector: 'jhi-notification-receipt-detail',
  templateUrl: './notification-receipt-detail.component.html',
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class NotificationReceiptDetailComponent {
  notificationReceipt = input<INotificationReceipt | null>(null);

  previousState(): void {
    window.history.back();
  }
}
