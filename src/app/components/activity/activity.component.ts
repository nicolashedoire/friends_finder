import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { PlaceService } from '../../services/place.service';
import { LocalstorageService } from '../../shared/storage/localstorage.service';
import { AuthentificationService } from '../../shared/security/auth.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  d = new Date();

  time = { hour: ('00' + this.d.getHours()).slice(-2).toString(), minute: ('00' + this.d.getMinutes()).slice(-2).toString()};
  activityTime: string;
  activity: string;
  city: string;
  bar: string;
  isBar = false;

  activities = [];
  places = [];

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
      this.d = new Date();
      this.time = { hour: ('00' + this.d.getHours()).slice(-2).toString(), minute: ('00' + this.d.getMinutes()).slice(-2).toString() };
     }, 1000 * 60);
  }

  ngOnInit() {}

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
    if (this.activityTime === undefined) {
      this.activityTime = this.formatTime(this.time);
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
        this.time = { hour: '12', minute: '30' };
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
