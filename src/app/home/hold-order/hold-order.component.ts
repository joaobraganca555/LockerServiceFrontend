import { Component } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { StationService } from 'src/app/core/services/station/station.service';


@Component({
  selector: 'app-hold-order',
  templateUrl: './hold-order.component.html',
  styleUrls: ['./hold-order.component.css']
})
export class HoldOrderComponent {
  headerTitle = 'Retain Order';
  searchTerm = '';
  stationName = '';
  selectedValue = 1;
  isClicked = false;
  stations: any = [];
  orderRetain: any = [];
  lockersStation: any = [];
  public selectedOrder: any;
  locker_stations: any = [];

  constructor(
    private stationService: StationService,
    private orderService: OrderService,
    private alertService: AlertService
  ){}
  
  ngOnInit(): void {
    this.stationService.getStations().subscribe({
      next: (data) => {
        if (data) {
          this.stations = data;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.getOrderToRetain();
  }

  getOrderToRetain() {
    this.orderService.getOrderRetain().subscribe({
      next: (data) => {
        if (data) {
          this.orderRetain = data;          
          for (let i = 0; i < data.length; i++) {        
            this.getLockerStation(data[i].destinationLockerId).subscribe({
              next: (data: any) => {            
                if (data) {
                  this.orderRetain[i].stationName = data.station.name;
                }
              },
              error: (error: any) => {
                console.log(error);
              }
            });
          }
          console.log(data);          
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  
   getLockerStation(idLocker:number): Observable<any> {
    return this.orderService.getLockerStation(idLocker).pipe(
      map((data) => {
        if (data) {
          this.locker_stations = data;
        }
        return data;
      }),
      catchError((error) => {
        console.log(error);
        return of(null); // retorna um Observable vazio em caso de erro
      })
    );
  }
public onOrderClick(orderR: any): void {

this.orderService.retainedOrder(orderR).subscribe({
  next: () => {
      this.alertService.showSuccessToast('Order Retained successfully!');
      this.getOrderToRetain()
  },
  error: (error) => {
    this.alertService.showSuccessToast('Order Retained successfully!');
    this.getOrderToRetain()
  }
});
}
}

