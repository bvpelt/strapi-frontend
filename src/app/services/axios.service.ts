import { Injectable } from '@angular/core';
import axios from 'axios';
import { Category } from '../model/category';
import { Restaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  retval: any;
  err: any;
  
  constructor() { }

  async getRestaurants() {
    const response = await axios.get('http://localhost:1337/restaurants');
    return response;
  }

  addRestaurant(restaurant: Restaurant): any {
    var id: number = -1;
    var error: string = null;
    axios.post('http://localhost:1337/restaurants', {
      name: restaurant.name, /*'Dolemon Sushi',*/
      description: restaurant.description, /* 'Unmissable Japanese Sushi restaurant. The cheese and salmon makis are delicious', */
      categories: restaurant.categories, /* [3], */
    }).then
      (response => {
        id = response.data.id;
        error = null;
      }),
      (error => {
        id = null;
        error = error
      });

      return {id, error};
  }

  addCategory(category: Category): any {
    var category: Category;
    var error: string = null;
    axios.post('http://localhost:1337/categories', {
      name: category.name, /*'Dolemon Sushi',*/
    }).then
    (response => { 
      console.log("result post addCategorie: " + JSON.stringify(response));
      return response;           
    }),
    (error => {
      console.log("result post addCategorie: " + JSON.stringify(error));
      return error;
    });
  }

}