import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../shared/security/auth.service';
import { LocalstorageService } from '../../shared/storage/localstorage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile = null;

  constructor(
    private authService: AuthentificationService,
    private localStorageService: LocalstorageService
  ) {}

  ngOnInit() {
    this.userProfile = this.authService.decodeToken();
  }
}
