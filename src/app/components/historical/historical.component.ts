import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {
  activities = [];

  constructor(private activityService: ActivityService) {
    activityService.getAll().subscribe(response => {
      this.activities = response.activities;
    });
  }

  ngOnInit() {}

  deleteActivity(activity: any) {
    this.activityService.delete(activity).subscribe(data => {
      this.activityService.getAll().subscribe(response => {
        this.activities = response.activities;
        this.activityService.sendSignal();
      });
    });
  }
}
