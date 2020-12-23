import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../model/restaurant';
import { AxiosService } from '../services/axios.service';
import { HttpService } from '../services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  error = null;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    /*
    this.axioService.getRestaurants().then(
      (response) => this.restaurants = response.data,
      (error) => this.error = error
    );
    */
    this.getRestaurants();
  }

  getRestaurants(): void {
    this.httpService.getRestaurants().subscribe(restaurants => this.restaurants = restaurants);
  }
}
