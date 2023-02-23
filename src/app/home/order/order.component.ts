import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { StationService } from 'src/app/core/services/station/station.service';
import { ILockersPrice } from 'src/app/models/lockersPrice.interface';
import { Order } from 'src/app/models/order.model';
import { RequestPending } from 'src/app/models/requestPending.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  // Inputs
  headerTitle = 'Orders';

  // Variables
  myForm: FormGroup;
  stations: any[] = [];
  lockersPrice: ILockersPrice = {
    S: 1,
    M: 2,
    L: 3
  };
  totalPrice = 0;
  canConfirmOrder = false;
  canReserveOrder = true;
  originStation = '';
  destinationStation = '';
  originStationId = 0;
  destinationStationId = 0;

  originLockerId = 0;
  destinationLockerId = 0;
  blockInputs = false;
  orderID = 0;

  // Errors
  isEmailEmpty = false;
  isDaysInvalid = false;
  isOriginStationNotSelected = false;
  isDestinationStationNotSelected = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stationService: StationService,
    private alertService: AlertService,
    private orderService: OrderService
  ) {
    this.myForm = fb.group({
      numberOfDays: [0, [Validators.required, this.validateNumberOfDays]],
      receiverEmail: ['', [Validators.required, Validators.email]],
      lockerSize: ['S', Validators.required],
      searchTermList1: [''],
      searchTermList2: ['']
    });
  }

  ngOnInit(): void {
    this.getFreeLockersByStation(this.myForm.value.lockerSize);
  }

  getFreeLockersByStation(size: string) {
    this.stationService.getStationsFreeLockersBySize(size).subscribe({
      next: (data) => {
        if (data) {
          this.stations = data;
        }
      },
      error: (data) => {
        this.alertService.showErrorToast(data.error.statusText);
      }
    });
  }

  redirect(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  selectItemOrigin(station: any) {
    this.originStation = station.name;
  }

  selectItemDestination(station: any) {
    this.destinationStation = station.name;
  }

  onChangeSize() {
    this.getFreeLockersByStation(this.myForm.value.lockerSize);
    this.checkPrice();
  }

  reserveLockers() {
    if (this.originStation != '' && this.destinationStation != '') {
      this.originStationId = this.findStationIdByName(this.originStation);
      this.destinationStationId = this.findStationIdByName(
        this.destinationStation
      );
      const requestPending: RequestPending = new RequestPending(
        this.originStationId,
        this.destinationStationId,
        this.myForm.value.lockerSize
      );

      this.orderService.requestPendingLockers(requestPending).subscribe({
        next: (data) => {
          if (data) {
            this.originLockerId = data.originLockerId;
            this.destinationLockerId = data.destinationLockerId;
            this.blockInputs = true;
            this.alertService.showSuccessToast(
              'Lockers were successfully reserved!'
            );
            this.canReserveOrder = false;
            this.canConfirmOrder = true;
          }
        },
        error: (data) => {
          console.error(data);
          if (data.error.detail) {
            this.alertService.showErrorToast(
              `You already have reserved lockers! Wait until expires.`
            );
          } else {
            this.alertService.showErrorToast(
              'Error while reserving your lockers'
            );
          }
        }
      });
    } else {
      this.alertService.showWarningToast('Do you have stations selected?');
    }
  }

  createOrder() {
    const order: Order = new Order(
      this.myForm.value.receiverEmail,
      this.originLockerId,
      this.destinationLockerId,
      this.myForm.value.numberOfDays
    );
    this.orderService.createOrder(order).subscribe({
      next: (data) => {
        this.orderID = data.id
        if (data) {
          this.alertService
            .showConfirmationAlert(
              'Order Confirmed! ',
              `Total amount: ${this.totalPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'EUR'
              })}`,
              'Confirm Payment',
              'Cancel'
            )
            .then((result) => {
              if (result.isConfirmed) {
                this.orderService.payOrder(data.id).subscribe({
                  next: (data) => {
                    
                    if (data) {
                      this.alertService
                        .showSuccessAlertWithButtons(
                          'Thank for your order!',
                          `<p>Order confirmed and payment completed!</p> Order ID: <strong>${this.orderID}</strong>, PIN: <strong>${data.pin}</strong>`,
                          'Go To Locker Screen',
                          'Ok'
                        )
                        .then((result) => {
                          if (result.isConfirmed) {
                            this.router.navigate([
                              `lockerScreen/${this.originLockerId}`
                            ]);
                          } else if (result.isDismissed) {
                            this.router.navigate([`home/allOrders`]);
                          }
                        });
                    }
                  },
                  error: (data) => {
                    console.error(data);
                    this.alertService.showErrorToast('Payment Failed!');
                  }
                });
              } else if (result.isDismissed) {
                this.alertService.showWarningToast(
                  'Your order is pending payment!'
                );
                this.router.navigate([`home/allOrders`]);
              }
            });
        }
      },
      error: (data) => {
        console.error(data);
        this.alertService.showErrorToast(
          'Some error ocurred while creating your order!'
        );
      }
    });
  }

  findStationIdByName(stationName: string): number {
    return this.stations[
      this.stations.findIndex((station) => station.name === stationName)
    ].id;
  }

  checkPrice() {
    this.totalPrice =
      this.lockersPrice[this.myForm.value.lockerSize] *
      this.myForm.value.numberOfDays;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateNumberOfDays(control: AbstractControl) {
    const value = control.value;
    if (value <= 0) {
      return { invalidNumberOfDays: true };
    }
    return null;
  }
}
