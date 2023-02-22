import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { StationService } from 'src/app/core/services/station/station.service';
import { Locker } from 'src/app/models/locker.model';
import { AlertService } from 'src/app/core/services/alerts/alert.service';

@Component({
  selector: 'app-addlocker',
  templateUrl: './addlocker.component.html',
  styleUrls: ['./addlocker.component.css']
})
export class AddlockerComponent implements OnInit {
  headerTitle = 'Lockers';
  // Variables
  searchTerm = '';
  lockersStation: any = [];
  stations: any = [];
  myForm: FormGroup;
  locker: Locker[] = [];
  stationName = '';
  selectedValue = 1;
  showForm = false;
  isClicked = false;

  constructor(
    private stationService: StationService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    {
      this.myForm = fb.group({
        quantity: [
          0,
          [
            Validators.required,
            Validators.pattern(/^\d+$/),
            this.greaterThanZeroValidator
          ]
        ],
        size: ['M']
      });
    }
  }
  getLockersByStation() {
    this.stationService.getLockersByStation(this.selectedValue).subscribe({
      next: (data) => {
        if (data && data.lockers) {
          this.lockersStation = data;
          this.stationName = this.lockersStation.name;
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

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
    this.getLockersByStation();
  }

  addLocker() {
    const locker = new Locker(
      this.myForm.get('size')?.value, //tamanho
      this.myForm.value.quantities, //quantidade
      this.selectedValue //estação
    );

    this.stationService.createLocker(locker).subscribe({
      next: () => {
        this.alertService.showSuccessToast('Station created successfully!');
        this.getLockersByStation();
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 300);
      },
      error: (data) => {
        if (data.error.detail) {
          this.alertService.showErrorToast(data.error.detail);
        } else {
          this.alertService.showErrorToast(data.error.statusText);
        }
      }
    });
  }

  showAddLockerForm() {
    this.isClicked = true;
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 300);
  }

  updateStations() {
    this.getLockersByStation();
  }

  greaterThanZeroValidator(control: FormControl) {
    const value = control.value;
    if (value <= 0) {
      return {
        greaterThanZero: true
      };
    }
    return null;
  }
}
