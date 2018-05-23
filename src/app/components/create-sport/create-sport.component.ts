import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-sport',
  templateUrl: './create-sport.component.html',
  styleUrls: ['./create-sport.component.scss']
})
export class CreateSportComponent implements OnInit {

  choice: string;

  constructor( private router: Router, private activatedRoute: ActivatedRoute) { 

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');
  }

  ngOnInit() {
  }

}
