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

  @Output() setOriginView = new EventEmitter();

  showBackButton = true;

  state = 'inactive';
  stateMenu = 'active';
  stateComplete = 'inactive';
  places = [];

  time = this.updateTime();
  activityTime: string;

  constructor(private placeService: PlaceService) {
    placeService.getAll().subscribe(response => {
      this.places = response;
    });
  }

  ngOnInit() {}

  selectPlace(id: string) {
    console.log(id);
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
    this.stateMenu = (this.stateMenu === 'active' ? 'inactive' : 'active');
    console.log(this.state);
  }

  updateTime() {
    const d = new Date();
    const time = {
      hour: ('00' + d.getHours()).slice(-2).toString(),
      minute: ('00' + d.getMinutes()).slice(-2).toString()
    };
    return time;
  }

  formatTime(event) {
    const time =
      this.minTwoDigits(event.hour) + ':' + this.minTwoDigits(event.minute);

    return time;
  }

  minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

  onTimeChange(event) {
    if (event !== null) {
      this.activityTime = this.formatTime(event);
    }
  }

  returnMenu() {

    if (this.state === 'active') {
      this.state = 'inactive';
      this.stateMenu = (this.stateMenu === 'active' ? 'inactive' : 'active');
      return;
    }

    this.setOriginView.emit();
  }


  validateTime() {
    this.state = this.state === 'inactive' ? 'active' : 'inactive';
    this.stateComplete = (this.stateComplete === 'active' ? 'inactive' : 'active');

    this.showBackButton = false;
    console.log(this.time);
  }

}
