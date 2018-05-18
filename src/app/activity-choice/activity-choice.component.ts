import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-choice',
  templateUrl: './activity-choice.component.html',
  styleUrls: ['./activity-choice.component.css']
})
export class ActivityChoiceComponent implements OnInit {

  choice: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');
  }

  ngOnInit() {}
}
