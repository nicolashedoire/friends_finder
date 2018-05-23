import {
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlaceService } from '../../services/place.service';
import { ActivityService } from '../../services/activity.service';
import {} from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';

// import maps in index.html and declare google var | open lib access
declare var google: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  selected: any;
  places = [];
  foodPlaces = [];
  activities = [];

  constructor(
    private placeService: PlaceService,
    private activityService: ActivityService,
    // private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}


  resetForm(form) {
    form.resetForm();
    this.places = [];
    this.activities = [];
  }

  select(place: any) {
    this.selected = place;
  }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 50.634333;
    this.longitude = 3.062667;

    // create search FormControl
    this.searchControl = new FormControl();

    const lille = new google.maps.LatLng(this.latitude, this.longitude);

    const map = new google.maps.Map(document.getElementById('map'), {
      center: lille,
      zoom: 13,
      scrollwheel: false
    });

    const infowindow = new google.maps.InfoWindow();

    this.placeService.getAll().subscribe(response => {

      this.places = response;
      const that  = this;

      this.places.forEach(item => {

        const marker = new google.maps.Marker({
          icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          position: item.location,
          map: map,
          title: item.name
        });

        google.maps.event.addListener(marker, 'click', function() {

          that.ngZone.run(() => {
            that.select(item);
          });

          const photo = item.photo;

          infowindow.setContent(
            '<div><strong>' +
              item.name +
              '</strong><br>' +
              '<br>' +
              '<img src="' +
              photo +
              '"/></div>'
          );
          infowindow.open(map, this);
        });
      });
    });


    this.placeService.getAllFood().subscribe(response => {

      this.foodPlaces = response;
      const that  = this;

      this.foodPlaces.forEach(item => {

        const marker = new google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          position: item.location,
          map: map,
          title: item.name
        });

        google.maps.event.addListener(marker, 'click', function() {

          that.ngZone.run(() => {
            that.select(item);
          });

          const photo = item.photo;

          infowindow.setContent(
            '<div><strong>' +
              item.name +
              '</strong><br>' +
              '<br>' +
              '<img src="' +
              photo +
              '"/></div>'
          );
          infowindow.open(map, this);
        });
      });
    });


    // Create the PlaceService and send the request.
    // Handle the callback with an anonymous function.
    // const service = new google.maps.places.PlacesService(map);
    // service.nearbySearch(request, function(results, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     for (let i = 0; i < results.length; i++) {
    //       const place = results[i];
    //       // If the request succeeds, draw the place location on
    //       // the map as a marker, and register an event to handle a
    //       // click on the marker.
    //       const marker = new google.maps.Marker({
    //         map: map,
    //         position: place.geometry.location
    //       });
    //     }
    //   }
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
