import { Component, OnInit } from '@angular/core';
import { getEnabledCategories } from 'trace_events';
import { Category } from '../model/category';
import { Restaurant } from '../model/restaurant';
import { AxiosService } from '../services/axios.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  name: string;
  description: string;
  categorieName: string;
  categories: Category[] = [];
  error = null;
  response: any;
  message: string;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  addRestaurant(): void {
    var newRestaurant: Restaurant = new Restaurant(this.name, this.description, this.categories);
    //this.axioService.addRestaurant(newRestaurant);
  }

  getCategories() {
    this.httpService.getCategories().subscribe(categories => this.categories = categories);
  }
}
