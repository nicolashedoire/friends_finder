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
    },
    {
      id: 2,
      name: 'Caro',
      rate: 3,
      image: 'https://randomuser.me/api/portraits/women/80.jpg',
      age: 32,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma'],
      activity: {
        name: 'Séance de running',
        date: Date.now(),
        time: '20:30',
        place: '54 rue nationale Lille'
      }
    },
    {
      id: 3,
      name: 'Claire',
      image: 'https://randomuser.me/api/portraits/women/81.jpg',
      age: 28,
      rate: 2,
      activity: {
        name: 'Séance de running',
        date: Date.now(),
        time: '20:30',
        place: '54 rue nationale Lille'
      }
    },
    {
      id: 4,
      name: 'Belinda',
      image: 'https://randomuser.me/api/portraits/women/82.jpg',
      age: 27,
      rate: 1,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma'],
      activity: {
        name: 'Séance de running',
        date: Date.now(),
        time: '20:30',
        place: '54 rue nationale Lille'
      }
    },
    {
      id: 5,
      name: 'Alice',
      image: 'https://randomuser.me/api/portraits/women/83.jpg',
      age: 31,
      rate: 0,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma'],
      activity: {
        name: 'Séance de running',
        date: Date.now(),
        time: '20:30',
        place: '54 rue nationale Lille'
      }
    },
    {
      id: 6,
      name: 'Charlotte',
      image: 'https://randomuser.me/api/portraits/women/84.jpg',
      age: 35,
      rate: 1,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma'],
      activity: {
        name: 'Séance de running',
        date: Date.now(),
        time: '20:30',
        place: '54 rue nationale Lille'
      }
    },
    {
      id: 7,
      name: 'Zoé',
      image: 'https://randomuser.me/api/portraits/women/85.jpg',
      age: 40,
      rate: 2,
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
    this.member = this.members[0];
    this.activityService.getAllToday().subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {}

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
