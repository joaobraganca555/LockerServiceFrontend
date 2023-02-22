import { Component } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { StationService } from 'src/app/core/services/station/station.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  headerTitle = 'Transporter';

  //
  searchTerm = '';
  stationName = '';
  selectedValue = 1;
  isClicked = false;
  stations: any = [];
  orderRetain: any = [];
  lockersStation: any = [];
  public selectedOrder: any;
  locker_stations: any = [];
//
  constructor(
    private stationService: StationService,
    private orderService: OrderService,
    private alertService: AlertService
  ){}
  

  ngOnInit(): void {

  }

  getOrderToRetain() {

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



