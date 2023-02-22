import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locker } from 'src/app/models/locker.model';
import { Station } from 'src/app/models/station.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  constructor(private http: HttpClient) {}

  createStation(station: Station): Observable<any> {
    console.log(station);
    return this.http.post(
      `${environment.gatewayBaseUrl}/station/create`,
      station
    );
  }
  createLocker(locker: Locker): Observable<any> {
    console.log(locker);
    return this.http.post(`${environment.gatewayBaseUrl}/station/add`, locker);
  }

  getStations(): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/locker/search/stations`
    );
  }

  getLockersByStation(id: number): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/locker/search/station/${id}/full`
    );
  }

  getFreeLockersByStation(id: number, size: string): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/locker/search/station/${id}/lockers/${size}`
    );
  }

  getAllLockersByStation(id: number): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/locker/search/station/${id}/full`
    );
  }

  getStationsFreeLockersBySize(size: string): Observable<any> {
    return this.http.get(
      `${environment.gatewayBaseUrl}/locker/search/station/${size}`
    );
  }
}
