import { Component, OnInit } from '@angular/core';
import { QueryService } from '../services/querie.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
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

  declineRequest(id: string){
    console.log(id);
  }

  acceptRequest(id: string){
    console.log(id);
  }
}
