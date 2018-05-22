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
  selector: 'app-bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.scss'],
  animations: [
    trigger('showView', [
      state(
        'inactive',
        style({
          display: 'none'
        })
      ),
      state(
        'active',
        style({
          display: 'block'
        })
      )
    ])
  ]
})
export class BarListComponent implements OnInit {

  places = [];
  choice: string;


  constructor(private placeService: PlaceService, private router: Router, private activatedRoute: ActivatedRoute) {

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');

    placeService.getAll().subscribe(response => {
      this.places = response;
    });
  }

  ngOnInit() {}

  addBar() {

  }

}
