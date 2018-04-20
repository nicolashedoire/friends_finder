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
// import { MapsAPILoader } from '@agm/core';

// import maps in index.html and declare google var | open lib access
declare var google: any;

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
    // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();


    const lille = new google.maps.LatLng(50.633333, 3.066667);

    const map = new google.maps.Map(document.getElementById('map'), {
      center: lille,
      zoom: 15,
      scrollwheel: false
    });


    const request = {
      location: lille,
      radius: '500',
      types: ['bar', 'cafe']
    };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        const place = results[i];
        console.log(place);
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });



    // // load Places Autocomplete
    // this.mapsAPILoader.load().then(() => {
    //   // set current position
    //   this.setCurrentPosition();

    //   const autocomplete = new google.maps.places.Autocomplete(
    //     this.searchElementRef.nativeElement,
    //     // Ajouter d'autres types si vous voulez autre chose que les adresses
    //     {
    //       types: ['bar']
    //     }
    //   );
    //   autocomplete.addListener('place_changed', () => {
    //     this.ngZone.run(() => {
    //       // get the place result
    //       const place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       // verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       // set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });
    // });

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
