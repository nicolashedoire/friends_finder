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
  time = this.updateTime();
  activityTime: string;
  activity: string;
  city: string;
  bar: string;
  isBar = false;

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
      this.places = response.places;
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
    this.bar = value;
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
        label: this.activity,
        city: 'Lille',
        place: this.bar,
        time: this.activityTime
      })
      .subscribe(data => {
        this.activities = data.activities;
        this.time = this.updateTime();
        this.activityTime = '';
        this.activity = '';
        this.city = '';
        this.bar = '';
      });
  }

  deleteActivity(id: string) {
    this.activityService.delete(id).subscribe(data => {
      this.activityService.getAll().subscribe(response => {
        this.activities = response.activities;
      });
    });
  }
}
