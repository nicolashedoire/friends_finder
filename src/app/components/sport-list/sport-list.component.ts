import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-sport-list',
  templateUrl: './sport-list.component.html',
  styleUrls: ['./sport-list.component.scss']
})
export class SportListComponent implements OnInit {

  sports = [];
  sport: string;
  choice: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sportService: SportService) {

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');

    this.sportService.getAll().subscribe(sports => {
      this.sports = sports;
    });
  }

  ngOnInit() {
  }

  addSport() {
    this.sportService.add(this.sport).subscribe(Response => {
        // TODO ADD SUCCESS MESSAGE
        this.router.navigate(['/activity/' + this.choice]);
    });
  }
}
