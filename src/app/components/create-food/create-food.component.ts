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
import {} from 'googlemaps';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

// import maps in index.html and declare google var | open lib access
declare var google: any;

@Component({
  selector: 'app-create-food',
  templateUrl: './create-food.component.html',
  styleUrls: ['./create-food.component.scss']
})
export class CreateFoodComponent implements OnInit {
  place: any;
  choice: string;

  @ViewChild('search') public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private placeService: PlaceService,
    private activityService: ActivityService
  ) {
    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.searchElementRef.nativeElement
      // Ajouter d'autres types si vous voulez autre chose que les adresses
      // {
      //   types: []
      // }
    );

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: google.maps.places.PlaceResult = autocomplete.getPlace();

      const photo = place.photos[0].getUrl({
        maxWidth: 300,
        maxHeight: 300
      });
      place['photo'] = photo;

      this.place = place;
    });
  }

  addPlace() {
    if (typeof this.place === 'object') {
      this.placeService.addFood(this.place).subscribe(data => {
        // TODO ADD SUCCESS MESSAGE
        this.router.navigate(['/activity/' + this.choice]);
      });
    }
  }
}
