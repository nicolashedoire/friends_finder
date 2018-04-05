import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  time = {hour: 13, minute: 30};

  constructor() { }

  ngOnInit() {
  }

}
