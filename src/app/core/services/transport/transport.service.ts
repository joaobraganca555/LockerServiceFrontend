import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  constructor(private http: HttpClient) {}

  getOrderToTranspoter(): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/order/origin`
    );
  }

  getOrderInTranspoter(): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/order/transporting`
    );
  }

}
