import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersComponent implements OnInit {
  members = [
    {
      id: 1,
      name: 'Julie',
      image: 'https://randomuser.me/api/portraits/women/79.jpg',
      age: 31,
      rate: 4,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma'],
      activity: {
        name: 'Séance de running',
        date: Date.now(),
        time: '20:30',
        place: '54 rue nationale Lille'
      }
    }
  ];

  member: any;
  count = 0;

  constructor(private activityService: ActivityService) {

    // Observe changes when click join event in modal
    this.activityService.getUpdateJoinUsers().subscribe(() => {
      this.getDayActivities();
      this.resetCount();
    });

    // Observe change when delete an activity
    this.activityService.getChange().subscribe(() => {
      this.getAllActive();
      this.resetCount();
    });

    this.getAllActive();
  }

  ngOnInit() {}

  resetCount() {
    this.count = 0;
  }

  getAllActive() {
    this.activityService.getAllActive().subscribe(data => {
      this.members = data.accounts;
      this.member = data.accounts[0];

      console.log(this.member);
    });
  }

  previousMember(): void {
    if (this.count === 0) {
      return;
    }

    this.count--;
    this.member = this.members[this.count];
  }

  nextMember(): void {
    if (this.count === this.members.length - 1) {
      return;
    }

    this.count++;
    this.member = this.members[this.count];
  }
}
