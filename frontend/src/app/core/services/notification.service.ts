import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title);
  }

  showHtmlMessage(message: string, title: string, isSuccess = true) {
    if (isSuccess) {
      this.toastr.success(message, title, { enableHtml: true });
    } else {
      this.toastr.error(message, title, { enableHtml: true });
    }
  }
}
