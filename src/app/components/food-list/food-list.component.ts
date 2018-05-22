import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  choice: string;

  constructor(private placeService: PlaceService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');

  }

  ngOnInit() {
  }
}
