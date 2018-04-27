import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
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
    });

    // Observe change when delete an activity
    this.activityService.getChange().subscribe(() => {
      this.getDayActivities();
    });

    this.getDayActivities();
  }

  ngOnInit() {}

  getDayActivities() {
    this.activityService.getAllToday().subscribe(data => {
      this.members = data;
      this.member = data[0];
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
