import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { INotificationReceipt } from '../notification-receipt.model';
import { NotificationReceiptService } from '../service/notification-receipt.service';

@Component({
  templateUrl: './notification-receipt-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class NotificationReceiptDeleteDialogComponent {
  notificationReceipt?: INotificationReceipt;

  protected notificationReceiptService = inject(NotificationReceiptService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.notificationReceiptService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
