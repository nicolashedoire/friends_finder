import {
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  Component
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlaceService } from '../../services/place.service';
import { ActivityService } from '../../services/activity.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search') public searchElementRef: ElementRef;

  selected: any;
  places = [];
  activities = [];

  constructor(
    private placeService: PlaceService,
    private activityService: ActivityService,
    private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone
  ) { }

  ngOnInit() { 

    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // set current position
      this.setCurrentPosition();

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        // Ajouter d'autres types si vous voulez autre chose que les adresses
        // {
        //   types: ['address']
        // }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

  searchPlace(place: string) {

    // Reset list of users
    this.activities = [];

    this.placeService.search(place).subscribe(
      response => {
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
    this.activities = [];
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

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
