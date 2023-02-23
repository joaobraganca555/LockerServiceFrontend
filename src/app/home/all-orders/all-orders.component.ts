import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Location } from '@angular/common';

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
    private alertService: AlertService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
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
          this.getOrders();
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
        if (data.error.detail) {
          this.alertService.showWarningToast(data.error.detail);
        } else {
          this.alertService.showErrorToast('Payment Failed!');
        }
      }
    });
  }

  isOrderExpired(order: any) {
    if (order.status === 'PENDING_PAYMENT') {
      return (
        new Date().getTime() - new Date(order.orderDate).getTime() >= 2400000
      );
    }
    return false;
  }

  redirectLocker(id: number) {
    this.router.navigate([`lockerScreen/${id}`]);
  }

  redirectGeneratePin(id: number) {
    this.router.navigate([`collectOrder/${id}`]);
  }

  getBaseUrl(): string {
    return `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
  }

  sendEmail(receiverEmail: string, destinationLocker: number) {
    const subject = 'Locker Service Message';
    const body = `Your Order is ready to be picked up!. Generate your PIN here: ${this.getBaseUrl()}/collectOrder/${destinationLocker}`;

    const mailtoLink = `mailto:${receiverEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_self');
  }
}
