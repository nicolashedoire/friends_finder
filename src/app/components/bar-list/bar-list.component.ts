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
import { PlaceService } from '../../services/place.service';


@Component({
  selector: 'app-bar-list',
  templateUrl: './bar-list.component.html',
  styleUrls: ['./bar-list.component.css'],
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


  constructor(private placeService: PlaceService) {
    placeService.getAll().subscribe(response => {
      this.places = response;
    });
  }

  ngOnInit() {}

  addBar() {

  }

}
