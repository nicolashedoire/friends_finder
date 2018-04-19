import { Component, OnInit } from '@angular/core';

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
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma']
    },
    {
      id: 2,
      name: 'Caro',
      image: 'https://randomuser.me/api/portraits/women/80.jpg',
      age: 32,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma']
    },
    {
      id: 3,
      name: 'Claire',
      image: 'https://randomuser.me/api/portraits/women/81.jpg',
      age: 28
    },
    {
      id: 4,
      name: 'Belinda',
      image: 'https://randomuser.me/api/portraits/women/82.jpg',
      age: 27,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma']
    },
    {
      id: 5,
      name: 'Alice',
      image: 'https://randomuser.me/api/portraits/women/83.jpg',
      age: 31,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma']
    },
    {
      id: 6,
      name: 'Charlotte',
      image: 'https://randomuser.me/api/portraits/women/84.jpg',
      age: 35,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma']
    },
    {
      id: 7,
      name: 'Zoé',
      image: 'https://randomuser.me/api/portraits/women/85.jpg',
      age: 40,
      hobbies: ['Running', 'Yoga', 'Restaurants', 'Cinéma']
    }
  ];

  member: any;
  count = 0;

  constructor() {
    this.member = this.members[0];
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
