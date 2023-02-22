import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { StationService } from 'src/app/core/services/station/station.service';
import { Station } from 'src/app/models/station.model';

interface Locker {
  id: number;
  free: boolean;
  sizeName: string;
}

@Component({
  selector: 'app-search-station-locker',
  templateUrl: './search-station-locker.component.html',
  styleUrls: ['./search-station-locker.component.css']
})
export class SearchStationLockerComponent implements OnInit {
  headerTitle = 'Search Station Locker';

  searchTermList = '';
  stations: Station[] = [];
  selectedStation = '';
  lockers: Locker[] = [];

  constructor(
    private stationService: StationService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.stationService.getStations().subscribe({
      next: (data) => {
        if (data) {
          this.stations = data;
        }
      },
      error: (data) => {
        this.alertService.showErrorToast(data.error.statusText);
      },
      complete: () => {
        this.selectedStation = this.stations[0].name;
        const stationId =
          this.stations[this.findStationIndexByName(this.selectedStation)].id;
        this.getLockersByStation(stationId);
      }
    });
  }

  selectStation(station: Station) {
    this.selectedStation = station.name;

    const stationId =
      this.stations[this.findStationIndexByName(this.selectedStation)].id;
    this.getLockersByStation(stationId);
  }

  getLockersByStation(id: number) {
    this.stationService.getAllLockersByStation(id).subscribe({
      next: (data) => {
        if (data) {
          this.lockers = data.lockers;
        }
      },
      error: (data) => {
        this.alertService.showErrorToast(data.error.statusText);
        this.lockers = [];
      }
    });
  }

  findStationIndexByName(stationName: string) {
    return this.stations.findIndex((station) => station.name === stationName);
  }

  countBySizeNameAndState(sizeName: string, free: boolean) {
    return this.lockers.filter(
      (locker) => locker.sizeName === sizeName && locker.free === free
    ).length;
  }
}
