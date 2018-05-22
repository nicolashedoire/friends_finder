import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AuthentificationService } from '../../shared/security/auth.service';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'] ,
  animations: [
    trigger('showView', [
      state('inactive', style({
        display: 'none'
      })),
      state('active', style({
        display: 'block'
      }))
    ])
  ]
})
export class ActivityCardComponent implements OnInit {

  userData = null;
  state = 'inactive';
  stateMenu = 'active';

  constructor(public authService: AuthentificationService) {
    if (this.authService.isAuthenticated()) {
      this.userData = this.authService.decodeToken();
    }
  }

  ngOnInit() {}

  showView(item) {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    this.stateMenu = (this.stateMenu === 'active' ? 'inactive' : 'active');
  }


  handleOriginView() {
    this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    this.stateMenu = (this.stateMenu === 'active' ? 'inactive' : 'active');
  }

}
