import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent {
  // Inputs
  headerTitle = 'Estações';

  // Variables

  // Errors

  items = [
    {
      name: 'Felgueiras',
      selectedOrigin: false,
      selectDestination: false,
      freeLockers: 5
    }
  ];

  constructor(private router: Router) {}

  // TODO: create item/station model and replace the any
}
