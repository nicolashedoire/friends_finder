import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  alcool = '';
  alcoolsImg = [
    {image: '/assets/img/wine.png', name: 'Vin'},
    {image: '/assets/img/whisky.png', name: 'Whisky'},
    {image: '/assets/img/rhum.png', name: 'Rhum'},
    {image: '/assets/img/beer.png', name: 'Bière'},
    {image: '/assets/img/soda.png', name: 'Soda'},
    {image: '/assets/img/cafe.png', name: 'Café'},
    {image: '/assets/img/cocktail.png', name: 'Cocktail'},
    {image: '/assets/img/martini.png', name: 'Martini'}
  ];

  alcoolOnChange(value: string) {
    this.alcool = this.alcoolsImg[value];
    console.log(value);
  }
}
