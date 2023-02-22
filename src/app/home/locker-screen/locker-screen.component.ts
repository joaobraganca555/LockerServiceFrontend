import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { LockerService } from 'src/app/core/services/locker/locker.service';
import { Locker } from 'src/app/models/locker.interface';

@Component({
  selector: 'app-locker-screen',
  templateUrl: './locker-screen.component.html',
  styleUrls: ['./locker-screen.component.css']
})
export class LockerScreenComponent implements OnInit {
  id = 0;
  displayValue = '';
  isDecimal = false;
  locker: Locker | undefined = undefined;
  failedToGetLockerInfo = false;

  constructor(
    private route: ActivatedRoute,
    private lockerService: LockerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
    console.log(this.id);
    this.lockerService.getLockerById(this.id).subscribe({
      next: (data: Locker) => {
        this.failedToGetLockerInfo = false;
        this.locker = data;
      },
      error: (error) => {
        console.log(error);
        this.failedToGetLockerInfo = true;
      }
    });
  }

  onKeyPress(key: string): void {
    if (key === 'C') {
      this.clear();
    } else if (key === 'CE') {
      this.clearLastEntry();
    } else if (key === 'Enter') {
      this.submit();
    } else if (key === '.') {
      if (!this.isDecimal) {
        this.isDecimal = true;
        this.displayValue += key;
      }
    } else {
      this.displayValue += key;
    }
  }

  clear(): void {
    this.displayValue = '';
    this.isDecimal = false;
  }

  clearLastEntry(): void {
    if (this.displayValue.length > 0) {
      if (this.displayValue[this.displayValue.length - 1] === '.') {
        this.isDecimal = false;
      }
      this.displayValue = this.displayValue.slice(0, -1);
    }
  }

  submit(): void {
    console.log('Submit value:', this.displayValue);
    if (this.displayValue === '' || this.displayValue.length < 4) {
      this.alertService.showWarningToast('Please enter a valid pin!');
    } else {
      this.lockerService.openLockerById(this.id, this.displayValue).subscribe({
        next: (data) => {
          if (data) {
            console.log(data);
            this.alertService.showSuccessToast(data);
          }
        },
        error: (data) => {
          console.error(data);
          this.alertService.showErrorToast('Failed to open locker!');
        }
      });
    }
  }

  onCloseLocker() {
    this.lockerService.closeLockerById(this.id).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          this.alertService.showSuccessToast(data);
        }
      },
      error: (data) => {
        console.error(data);
        this.alertService.showErrorToast('Failed to close locker!');
      }
    });
  }

  getButtons(): string[] {
    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'CE', 'C'];
  }
}
