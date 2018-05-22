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

  activities = [];

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
