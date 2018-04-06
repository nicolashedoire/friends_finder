import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  time = {hour: 12, minute: 30};
  activity: string;
  city: string;


  constructor() { }

  ngOnInit() {
  }


  sendActivity() {
    console.log(this.time, this.activity, this.city);
  }

}
