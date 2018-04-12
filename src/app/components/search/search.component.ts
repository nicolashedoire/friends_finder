import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  selected: any;
  places = [];

  constructor(private placeService: PlaceService) {}

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

  select(item) {
    this.selected = item;
  }

  isActive(item) {
    return this.selected === item;
  }
}
