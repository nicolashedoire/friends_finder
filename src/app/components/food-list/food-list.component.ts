import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  Output,
  EventEmitter
} from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  places = [];
  choice: string;

  constructor(private placeService: PlaceService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');

    placeService.getAllFood().subscribe(response => {

      console.log(response);
      this.places = response;
    });

  }

  ngOnInit() {
  }
}
