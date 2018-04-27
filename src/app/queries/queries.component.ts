import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/querie.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  queries = [];

  constructor(private querieService: QueryService) {

    querieService.getAll().subscribe(queries => {
      this.queries = queries;
    });
  }

  ngOnInit() {
  }

  deleteQuery(id: string) {
    console.log(id);
    this.querieService.delete(id).subscribe(response => {
      console.log(response);

      this.querieService.getAll().subscribe(queries => {
        this.queries = queries;
      });
    });
  }
}
