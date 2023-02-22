import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { StationService } from 'src/app/core/services/station/station.service';
import { ProblemDetail } from 'src/app/models/problemDetail.model';
import { Station } from 'src/app/models/station.model';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  // Header
  headerTitle = 'Stations';

  // Variables
  myForm: FormGroup;
  stations: Station[] = [];
  isClicked = false;
  searchTerm = '';

  // Errors
  pd: ProblemDetail = new ProblemDetail();
  failedToCreateStation = false;

  constructor(
    private fb: FormBuilder,
    private stationService: StationService,
    private alertService: AlertService
  ) {
    this.myForm = fb.group({
      stationName: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.pattern(/^\d{4}-\d{3}$/)],
      country: ['', Validators.required],
      address: ['', Validators.required],
      smallLocker: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      mediumLocker: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
      largeLocker: [0, [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit(): void {
    this.getStations();
  }

  getStations() {
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
  }

  addStation() {
    const station = new Station(
      0,
      this.myForm.value.stationName,
      {
        id: 0,
        country: this.myForm.value.country,
        city: this.myForm.value.city,
        address: this.myForm.value.address,
        zipCode: this.myForm.value.zipCode
      },
      {
        s: this.myForm.value.smallLocker,
        m: this.myForm.value.mediumLocker,
        l: this.myForm.value.largeLocker
      },
      new Date()
    );
    this.stationService.createStation(station).subscribe({
      next: () => {
        this.getStations();
        this.myForm.reset();
        this.alertService.showSuccessToast('Station created successfully!');
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 300);
      },
      error: (data) => {
        if (data.error.detail) {
          this.failedToCreateStation = true;
          this.pd = data.error;
        } else {
          this.failedToCreateStation = true;
          this.pd.detail = data.statusText;
        }
      }
    });
  }

  open() {
    this.isClicked = true;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 300);
  }
}
