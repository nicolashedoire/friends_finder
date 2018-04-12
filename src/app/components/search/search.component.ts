import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  selected: any;
  places = [];
  activities = [];

  constructor(
    private placeService: PlaceService,
    private activityService: ActivityService
  ) {}

  ngOnInit() {}

  searchPlace(place: string) {
    this.placeService.search(place).subscribe(
      response => {
        console.log(response);
        this.places = response.places;
      },
      error => {
        console.error(error);
      }
    );
  }

  resetForm(form) {
    form.resetForm();
    this.places = [];
  }

  select(place: any) {
    this.selected = place;
    this.activityService.getByPlaceId(place.id).subscribe(data => {
      this.activities = data.activities;
    });
  }

  isActive(item) {
    return this.selected === item;
  }
}
