import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sentences = [
    'Faites de nouvelles connaissances',
    'Créez une activité pour votre soirée ou rejoignez du monde'
  ];
  intro = this.sentences[0];
  count = 0;

  myStyle = {};
  myParams = {};
  width = 100;
  height = 100;

  constructor() {
    // setInterval(() => {
    //   if (this.count === this.sentences.length) {
    //     this.count = 0;
    //   }
    //   this.intro = this.sentences[this.count];
    //   this.count++;
    // }, 3000);
  }

  ngOnInit() {
    // this.myStyle = {
    //   'position': 'fixed',
    //   'width': '100%',
    //   'height': '100%',
    //   'z-index': 1,
    //   'top': '75px',
    //   'left': 0,
    //   'right': 0,
    //   'bottom': 0,
    // };

    // this.myParams = {
    //   particles: {
    //     number: {
    //       value: 90,
    //     },
    //     color: {
    //       value: '#000000'
    //     },
    //     shape: {
    //       type: 'circle',
    //     },
    //   }
    // };
  }
}
