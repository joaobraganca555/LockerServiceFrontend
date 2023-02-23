import { Component } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { TransportService } from 'src/app/core/services/transport/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent {
  headerTitle = 'Transporter';
  toTransport: any = [];
  inTransport: any = [];
  pickedUp = false;
  deposited = false;
  searchTerm = '';
  //
  selectedValue = 1;
  orderRetain: any = [];
  public selectedOrder: any;
  locker_stations: any = [];
//
  constructor(
    private transportService: TransportService ,
    private orderService: OrderService,
    private alertService: AlertService
  ){}
  

  ngOnInit(): void {
    this.getOrderToTranspoter();
    this.getOrderInTranspoter()   
  }

  
  getOrderToTranspoter(){
   this.transportService.getOrderToTranspoter().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.toTransport = data;
          //console.log(this.toTransport)
          for (let i = 0; i < data.length; i++) {        
            this.getLockerStation(data[i].destinationLockerId).subscribe({
              next: (data: any) => {            
                if (data) {
                  this.toTransport[i].stationName = data.station.name;
                }
              },
              error: (error: any) => {
                console.log(error);
              }
            });
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getOrderInTranspoter(){
    this.transportService.getOrderInTranspoter().subscribe({
       next: (data) => {
         if (data) {
           this.inTransport = data;
           //console.log(this.toTransport)
           for (let i = 0; i < data.length; i++) {        
             this.getLockerStation(data[i].destinationLockerId).subscribe({
               next: (data: any) => {            
                 if (data) {
                   this.inTransport[i].stationName = data.station.name;
                 }
               },
               error: (error: any) => {
                 console.log(error);
               }
             });
           }
         }
       },
       error: (error) => {
         console.log(error);
       }
     });
   }
  

public onPickClick(id: number): void {
  console.log(id);
  this.pickedUp = true;

this.transportService.putOrderTransport(id).subscribe({
  next: (data) => {
    console.log(data)
    this.getOrderInTranspoter();
    this.getOrderToTranspoter();
    this.alertService.showSuccessToast('Order To Transport successfully!');
  },
  error: (error) => {
    console.log("Transporte Erro")
  }
});
}

public onDepositClick(id: number): void {
  console.log(id);
  this.deposited = true;
  this.transportService.putOrderDelivery(id).subscribe({
    next: (data) => {
      console.log(data)
      this.getOrderInTranspoter();
      this.getOrderToTranspoter();
        this.alertService.showSuccessToast('Order on Deposit successfully!');
    },
    error: (error) => {
      console.log("Transporte Erro")
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
}



