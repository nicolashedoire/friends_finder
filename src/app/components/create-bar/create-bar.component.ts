import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-bar',
  templateUrl: './create-bar.component.html',
  styleUrls: ['./create-bar.component.css']
})
export class CreateBarComponent implements OnInit {

  choice: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');
  }

  ngOnInit() {
  }

}
