import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ActivityService } from '../services/activity.service';
import { AuthentificationService } from '../shared/security/auth.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ActivityItemComponent implements OnInit {
  choice: string;
  idItem: string;
  time = this.updateTime();
  activityTime: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    public authService: AuthentificationService
  ) {
    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');
    this.idItem = this.activatedRoute.snapshot.paramMap.get('id');

    console.log(this.choice, this.idItem);
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

  formatTime(event) {
    const time =
      this.minTwoDigits(event.hour) + ':' + this.minTwoDigits(event.minute);

    return time;
  }

  minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

  onTimeChange(event) {
    if (event !== null) {
      this.activityTime = this.formatTime(event);
    }
  }

  sendActivity() {

    const userData = this.authService.decodeToken();
    this.activityService
      .post({
        userId: userData['id'],
        label: this.choice,
        placeId: this.idItem,
        time: this.activityTime
      })
      .subscribe(data => {
        this.router.navigate([
          '/activity/' + this.choice + '/' + this.idItem + '/complete'
        ]);
      });
  }
}
