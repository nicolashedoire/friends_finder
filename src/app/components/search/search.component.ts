import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../services/place.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  places = [];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
  }

  searchPlace(place: string)  {
    this.placeService.search(place).subscribe(response => {
      console.log(response);
      this.places = response;
    }, error => {
      console.error(error);
    });
  }

}
