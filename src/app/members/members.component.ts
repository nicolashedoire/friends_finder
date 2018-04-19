import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [
    {
      name: 'Julie',
      image: 'https://randomuser.me/api/portraits/women/79.jpg'
    },
    { name: 'Caro', image: 'https://randomuser.me/api/portraits/women/80.jpg' },
    {
      name: 'Claire',
      image: 'https://randomuser.me/api/portraits/women/81.jpg'
    },
    {
      name: 'Belinda',
      image: 'https://randomuser.me/api/portraits/women/82.jpg'
    },
    {
      name: 'Alice',
      image: 'https://randomuser.me/api/portraits/women/83.jpg'
    },
    {
      name: 'Charlotte',
      image: 'https://randomuser.me/api/portraits/women/84.jpg'
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
    if (this.count === this.members.length) {
      return;
    }

    this.count++;
    this.member = this.members[this.count];
  }
}
