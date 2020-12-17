import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../services/axios.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants = [];
  error = null;

  constructor(private axioService: AxiosService) { }

  ngOnInit(): void {
      this.axioService.getRestaurants().then(
        (response) => this.restaurants = response.data,
        (error) => this.error = error
      );
    }

}
