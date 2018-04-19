import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {

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

  foodsImg = [
    {image: '/assets/img/hamburger.png', name: 'Hamburger'},
    {image: '/assets/img/fries.png', name: 'Frites'},
    {image: '/assets/img/hot-dog.png', name: 'Hot dog'},
    {image: '/assets/img/pizza.png', name: 'Pizza'},
    {image: '/assets/img/salad.png', name: 'Salade'},
    {image: '/assets/img/sandwich.png', name: 'Sandwich'},
    {image: '/assets/img/tacos.png', name: 'Tacos'},
    {image: '/assets/img/spaghetti.png', name: 'Pâtes'}
  ];

}
