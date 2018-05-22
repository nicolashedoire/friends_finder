import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';
import { PlaceService } from '../../services/place.service';
import { LocalstorageService } from '../../shared/storage/localstorage.service';
import { AuthentificationService } from '../../shared/security/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}
