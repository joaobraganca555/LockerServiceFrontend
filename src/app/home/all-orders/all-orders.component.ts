import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { OrderService } from 'src/app/core/services/order/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  headerTitle = 'All Orders';
  searchTerm = '';

  stationName = '';
  selectedValue = 1;
  isClicked = false;
  allOrders = [];
  orderRetain = [];
  lockersStation = [];
  selectedOrder: any;
  locker_allOrders = [];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllBySender().subscribe({
      next: (data) => {
        if (data) {
          this.allOrders = data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onOrderPayClick(id: number, originLockerId: number) {
    this.orderService.payOrder(id).subscribe({
      next: (data) => {
        if (data) {
          this.alertService
            .showSuccessAlertWithButtons(
              'Thank for your order!',
              `<p>Order confirmed and payment completed!</p> Order ID: <strong>${id}</strong>, PIN: <strong>${data.pin}</strong>`,
              'Go To Locker Screen',
              'Ok'
            )
            .then((result) => {
              if (result.isConfirmed) {
                this.router.navigate([`lockerScreen/${originLockerId}`]);
              }
            });
        }
      },
      error: (data) => {
        console.error(data);
        this.alertService.showErrorToast('Payment Failed!');
      }
    });
  }

  redirectLocker(id: number) {
    this.router.navigate([`lockerScreen/${id}`]);
  }
}
