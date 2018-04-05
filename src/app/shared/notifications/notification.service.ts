import { Injectable } from '@angular/core';
import {
  NotificationsService,
  SimpleNotificationsModule
} from 'angular2-notifications';

@Injectable()
export class NotificationService {
  // options for notification element in component
  // TODO extract this in service or config file
  options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(private notification: NotificationsService) {}

  getOptions() {
    return this.options;
  }

  showError(err) {
    // Catch error | Show notification with status error and status text
    this.notification.error(err.status, err.statusText, {
      timeOut: 500,
      showProgressBar: true
    });
  }

  showSuccess() {
    this.notification.success('Success', 'Success', {
      timeOut: 500,
      showProgressBar: true
    });
  }
}
