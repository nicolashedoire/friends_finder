import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { SportService } from '../../services/sport.service';

@Component({
  selector: 'app-create-sport',
  templateUrl: './create-sport.component.html',
  styleUrls: ['./create-sport.component.scss']
})
export class CreateSportComponent implements OnInit {

  choice: string;
  sport: string;

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private sportService: SportService) {

    this.choice = this.activatedRoute.snapshot.paramMap.get('choice');
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
