import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {
  alcoolsImg = [
    { image: '/assets/img/wine.png', name: 'Vin', class: 'inactive' },
    { image: '/assets/img/whisky.png', name: 'Whisky', class: 'inactive' },
    { image: '/assets/img/rhum.png', name: 'Rhum', class: 'inactive' },
    { image: '/assets/img/beer.png', name: 'Bière', class: 'inactive' },
    { image: '/assets/img/champagn.png', name: 'Champagne', class: 'inactive' },
    { image: '/assets/img/soda.png', name: 'Soda', class: 'inactive' },
    { image: '/assets/img/cafe.png', name: 'Café', class: 'inactive' },
    { image: '/assets/img/cocktail.png', name: 'Cocktail', class: 'inactive' },
    { image: '/assets/img/martini.png', name: 'Martini', class: 'inactive' },
    { image: '/assets/img/water.jpg', name: 'Eau', class: 'inactive' },
    { image: '/assets/img/tea.png', name: 'Thé', class: 'inactive' }
  ];

  foodsImg = [
    {
      image: '/assets/img/hamburger.png',
      name: 'Hamburger',
      class: 'inactive'
    },
    { image: '/assets/img/fries.png', name: 'Frites', class: 'inactive' },
    { image: '/assets/img/hot-dog.png', name: 'Hot dog', class: 'inactive' },
    { image: '/assets/img/pizza.png', name: 'Pizza', class: 'inactive' },
    { image: '/assets/img/salad.png', name: 'Salade', class: 'inactive' },
    { image: '/assets/img/sandwich.png', name: 'Sandwich', class: 'inactive' },
    { image: '/assets/img/tacos.png', name: 'Tacos', class: 'inactive' },
    { image: '/assets/img/spaghetti.png', name: 'Pâtes', class: 'inactive' },
    { image: '/assets/img/cut-of-meat.png', name: 'Viande', class: 'inactive' }
  ];

  selectedItems = [];

  toggleActive(element) {
    if (element.class === 'inactive') {
      element.class = 'active';
      this.selectedItems.push(element);
    } else {
      element.class = 'inactive';
      this.selectedItems.splice(this.selectedItems.indexOf(element), 1);
    }
  }
}
