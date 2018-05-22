import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../shared/security/auth.service';
import { CountriesService } from '../../shared/countries/countries.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile = null;
  countries = [];

  constructor(
    private authService: AuthentificationService,
    private countriesService: CountriesService
  ) {
    this.countries = countriesService.get();
  }

  ngOnInit() {
    this.userProfile = this.authService.decodeToken();
  }

  saveProfile() {

    console.log(this.userProfile);
  }
}
