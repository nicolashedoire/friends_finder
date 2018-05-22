import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersComponent implements OnInit {

  members = [];
  member: any;
  count = 0;

  constructor(private activityService: ActivityService) {

    // Observe changes when click join event in modal
    this.activityService.getUpdateJoinUsers().subscribe(() => {
      this.getAllActive();
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
