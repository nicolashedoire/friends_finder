import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss']
})
export class SportListComponent implements OnInit {

  choice: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');
  }

  ngOnInit() {
  }

  addSport() {

  }
}
