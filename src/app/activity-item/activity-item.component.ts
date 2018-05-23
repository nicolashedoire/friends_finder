import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ActivityService } from '../services/activity.service';
import { AuthentificationService } from '../shared/security/auth.service';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
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

  sendActivity() {
    const userData = this.authService.decodeToken();
    const time = this.formatTime(this.time);

    console.log(this.choice);

    if (this.choice === 'eat') {
      this.activityService
        .postFood({
          userId: userData['id'],
          label: this.choice,
          placeId: this.idItem,
          time: time
        })
        .subscribe(data => {
          console.log(data);
          this.router.navigate([
            '/activity/' + this.choice + '/' + this.idItem + '/complete'
          ]);
        });
    } else if (this.choice === 'drink') {
      this.activityService
        .post({
          userId: userData['id'],
          label: this.choice,
          placeId: this.idItem,
          time: time
        })
        .subscribe(data => {
          console.log(data);
          this.router.navigate([
            '/activity/' + this.choice + '/' + this.idItem + '/complete'
          ]);
        });
    } else if (this.choice === 'sport'){
      this.activityService
        .postSport({
          userId: userData['id'],
          label: this.choice,
          placeId: this.idItem,
          time: time
        })
        .subscribe(data => {
          console.log(data);
          this.router.navigate([
            '/activity/' + this.choice + '/' + this.idItem + '/complete'
          ]);
        });
    }
  }
}
