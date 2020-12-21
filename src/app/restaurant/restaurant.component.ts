import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { Restaurant } from '../model/restaurant';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  name: string;
  description: string;
  categorieName: string;
  selectedCategories: Category[] = [];
  categories: Category[] = [];
  error = null;
  response: any;
  message: string;

  constructor(private axioService: AxiosService) { }

  ngOnInit(): void {
    this.axioService.getCategories().then(
      (response) => this.categories = response.data,
      (error) => this.error = error
    );
  }

  addRestaurant(): void {
    var newRestaurant: Restaurant = new Restaurant(this.name, this.description, this.categories);
    this.axioService.addRestaurant(newRestaurant);
  }

  addCategorie(): void {
    var newCategorie: Category = new Category(null, this.categorieName);
    var result = this.axioService.addCategory(newCategorie);
    console.log("restaurant addCategorie response: " + JSON.stringify(result));
    if (result.id) {
      //this.categories[this.categories.length] = result.id;
      this.categories.push(new Category(result.id, result.name));
    }
  }

  onSelect(categorie: Category) {
    console.log("selected categorie: " + JSON.stringify(categorie));
    this.selectedCategories.push(categorie);
  }

  isSelected(categorie: Category): boolean {
    var selected = false;
    
    const cat = this.selectedCategories.filter(knownCategorie => knownCategorie.id === categorie.id);
    console.log("restaurant isSelected cat: " + JSON.stringify(cat));
    if (cat) {
      selected = true;
    }
    return true;

  }
}
