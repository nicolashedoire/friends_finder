import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../shared/security/auth.service';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.css']
})
export class ActivityCardComponent implements OnInit {

  userData = null;

  constructor(public authService: AuthentificationService) {
    if (this.authService.isAuthenticated()) {
      this.userData = this.authService.decodeToken();

      console.log(this.userData);
    }
  }

  ngOnInit() {}
}
