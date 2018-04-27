import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { PlaceService } from '../../services/place.service';
import { LocalstorageService } from '../../shared/storage/localstorage.service';
import { AuthentificationService } from '../../shared/security/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  // Set the current time
  time = this.updateTime();

  activityTime: string;
  activity: string;
  city: string;
  barValue: string;
  isBar = false;

  activityList = [
    { id: '1', label: 'Aller boire un verre' },
    { id: '2', label: 'Faire un footing' },
    { id: '3', label: 'Aller au restaurant' }
  ];
  activities = [];
  places = [];

  activityControl = new FormControl('', Validators.required);

  constructor(
    private activityService: ActivityService,
    private placeService: PlaceService,
    private localStorageService: LocalstorageService,
    public authService: AuthentificationService
  ) {
    activityService.getAll().subscribe(response => {
      this.activities = response.activities;
    });

    placeService.getAll().subscribe(response => {
      this.places = response;
    });

    setInterval(() => {
      this.time = this.updateTime();
    }, 1000 * 60);
  }

  ngOnInit() {}

  updateTime() {
    const d = new Date();
    const time = {
      hour: ('00' + d.getHours()).slice(-2).toString(),
      minute: ('00' + d.getMinutes()).slice(-2).toString()
    };
    return time;
  }

  activityOnChange(value: string) {
    if (value === '1') {
      this.isBar = true;
    } else {
      this.isBar = false;
    }

    this.activity = value;
  }

  cityOnChange(value: string) {
    this.city = value;
  }

  barOnChange(value: string) {
    this.barValue = value;
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
    // GET activity object
    const activity = this.activityList.filter(item => {
      return this.activity === item.id;
    });

    if (!this.activityControl.valid) {
      return;
    }
    if (this.activityTime === undefined) {
      // this.activityTime = this.formatTime(this.time);
      return;
    }

    const userData = this.authService.decodeToken();

    this.activityService
      .post({
        userId: userData['id'],
        label: activity[0].label,
        placeId: this.barValue,
        time: this.activityTime
      })
      .subscribe(data => {
        this.activities = data.activities;
        this.time = this.updateTime();
        this.activityTime = '';
        this.activity = '';
        this.barValue = '';
        this.activityService.sendSignal();
      });
  }

  deleteActivity(activity: any) {
    this.activityService.delete(activity).subscribe(data => {
      this.activityService.getAll().subscribe(response => {
        this.activities = response.activities;
        this.activityService.sendSignal();
      });
    });
  }
}
