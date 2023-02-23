import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locker } from 'src/app/models/locker.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LockerService {
  constructor(private http: HttpClient) {}

  getLockerById(id: number): Observable<Locker> {
    return this.http.get<Locker>(
      `${environment.gatewayBaseUrl}/locker/search/${id}`
    );
  }

  openLockerById(id: number, pin: string): Observable<any> {
    return this.http.put(
      `${environment.gatewayBaseUrl}/locker/engine/open/${id}/${pin}`,
      {}
    );
  }

  closeLockerById(id: number): Observable<any> {
    return this.http.put(
      `${environment.gatewayBaseUrl}/locker/engine/close/${id}`,
      {}
    );
  }

  generatePin(id: number): Observable<any> {
    return this.http.post(
      `${environment.gatewayBaseUrl}/locker/engine/pin/${id}`,
      {}
    );
  }
}
