import { Component, OnInit } from '@angular/core';
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
  categories: number[];
  error = null;
  response: any;

  constructor(private axioService: AxiosService) { }
  
  ngOnInit(): void {
  }

  addRestaurant() {
    var newRestaurant: Restaurant = new Restaurant(this.name, this.description, this.categories);
    this.axioService.addRestaurant(newRestaurant).then(
      (response) => this.response = response,
      (error) => this.error = error
    );
  }
}
