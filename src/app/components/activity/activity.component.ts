import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity';
import { LocalstorageService } from '../../shared/storage/localstorage.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  time = { hour: 12, minute: 30 };
  activityTime: string;
  activity: string;
  city: string;

  activities = [];

  constructor(private activityService: ActivityService, private localStorageService: LocalstorageService) {}

  ngOnInit() {}

  activityOnChange(value: string) {
    this.activity = value;
  }

  cityOnChange(value: string) {
    this.city = value;
  }

  minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

  formatTime(event) {
    const time =
      this.minTwoDigits(event.hour) + ':' + this.minTwoDigits(event.minute);

    return time;
  }

  onTimeChange(event) {
    if (event !== null) {
      this.activityTime = this.formatTime(event);
    }
  }

  sendActivity() {
    if (this.activityTime === undefined) {
      this.activityTime = this.formatTime(this.time);
    }

    const userData = JSON.parse(this.localStorageService.getItem('userData'));

    this.activityService.post({
      userId: userData.id,
      label: this.activity,
      city: this.city,
      time: this.activityTime
    }).subscribe(data => {
      this.activities = data.activities;
      this.time = { hour: 12, minute: 30 };
      this.activityTime = '';
      this.activity = '';
      this.city = '';
    });
  }
}
