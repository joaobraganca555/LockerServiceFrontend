import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { RequestPending } from 'src/app/models/requestPending.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  retainedOrder(orderId: number): Observable<any> {
    return this.http.put(
      `${environment.gatewayBaseUrl}/order/ros/retain/${orderId}`,
      {}
    );
  }

  getOrderRetain(): Observable<any> {
    return this.http.get(`${environment.gatewayBaseUrl}/order/ros/toretain`);
  }

  getLockerStation(lockerId: number): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/locker/search/${lockerId}/station`
    );
  }

  getAllBySender(): Observable<any> {
    return this.http.get(`${environment.gatewayBaseUrl}/order/all`);
  }

  requestPendingLockers(requestPending: RequestPending): Observable<any> {
    return this.http.put(
      `${environment.gatewayBaseUrl}/locker/pending/request`,
      requestPending
    );
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post(`${environment.gatewayBaseUrl}/order/create`, order);
  }

  payOrder(orderId: number): Observable<any> {
    return this.http.post(`${environment.gatewayBaseUrl}/pay/${orderId}`, {});
  }
}
