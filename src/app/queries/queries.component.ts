import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/querie.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

  queries = [];
  requests = [];

  constructor(private querieService: QueryService) {

    querieService.getFriendRequests().subscribe(requests => {
      this.requests = requests;
      console.log(requests);
    });

    querieService.getAll().subscribe(queries => {
      this.queries = queries;
    });
  }

  ngOnInit() {
  }

  deleteQuery(id: string) {
    this.querieService.delete(id).subscribe(response => {
      this.querieService.getAll().subscribe(queries => {
        this.queries = queries;
      });
    });
  }

  updateQuery(id: string, state: string){
    console.log(id);
    this.querieService.update(id, state).subscribe(response => {
      this.querieService.getFriendRequests().subscribe(requests => {
        this.requests = requests;
        console.log(requests);
      });
    });
  }
}
