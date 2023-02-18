import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  // Inputs
  headerTitle = 'Encomendas';

  // Variables
  searchTermList1 = '';
  searchTermList2 = '';
  originStation = '';
  destinationStation = '';
  price = 4.0;
  numberOfDays = 0;
  lockerSize = 'S';
  receiverEmail = '';

  // Errors
  isEmailEmpty = false;
  isDaysInvalid = false;
  isOriginStationNotSelected = false;
  isDestinationStationNotSelected = false;

  items = [
    {
      name: 'Felgueiras',
      selectedOrigin: false,
      selectDestination: false,
      freeLockers: 5
    },
    {
      name: 'Porto',
      selectedOrigin: false,
      selectDestination: false,
      freeLockers: 6
    },
    {
      name: 'Braga',
      selectedOrigin: false,
      selectDestination: false,
      freeLockers: 3
    },
    {
      name: 'Lisboa',
      selectedOrigin: false,
      selectDestination: false,
      freeLockers: 1
    },
    {
      name: 'Póvoa de Varzim',
      selectedOrigin: false,
      selectDestination: false,
      freeLockers: 1
    },
    {
      name: 'Póvoa de Varzim Póvoa de Varzim',
      selectedOrigin: false,
      selectDestination: false,
      freeLockers: 1
    }
  ];

  constructor(private router: Router) {}

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  selectItemOrigin(item: any) {
    this.items.forEach((i) => (i.selectedOrigin = false));
    item.selectedOrigin = true;
    this.originStation = item.name;
    console.log(this.originStation);
  }

  selectItemDestination(item: any) {
    this.items.forEach((i) => (i.selectDestination = false));
    item.selectDestination = true;
    this.destinationStation = item.name;
    console.log(this.destinationStation);
  }

  confirmOrder() {
    if (this.numberOfDays < 1) {
      this.isDaysInvalid = true;
    } else {
      this.isDaysInvalid = false;
    }
    if (this.receiverEmail === '') {
      this.isEmailEmpty = true;
    } else {
      this.isEmailEmpty = false;
    }
    if (this.originStation === '') {
      this.isOriginStationNotSelected = true;
    } else {
      this.isOriginStationNotSelected = false;
    }
    if (this.destinationStation === '') {
      this.isDestinationStationNotSelected = true;
    } else {
      this.isDestinationStationNotSelected = false;
    }
  }

  change() {
    console.log(this.lockerSize);
  }

  // TODO: create item/station model and replace the any
}
