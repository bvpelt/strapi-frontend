import { Injectable } from '@angular/core';
import axios from 'axios';
import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() { }

  async getRestaurants() {
    const response = await axios.get('http://localhost:1337/restaurants');
    return response;
  }

  async addRestaurant(restaurant: Restaurant) {
    const response = await axios.post('http://localhost:1337/restaurants', {
      name: restaurant.name, /*'Dolemon Sushi',*/
      description: restaurant.description, /* 'Unmissable Japanese Sushi restaurant. The cheese and salmon makis are delicious', */
      categories: restaurant.categories, /* [3], */
    });
  }

}
