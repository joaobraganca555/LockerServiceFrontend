import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { LockerService } from 'src/app/core/services/locker/locker.service';

@Component({
  selector: 'app-collect-order',
  templateUrl: './collect-order.component.html',
  styleUrls: ['./collect-order.component.css']
})
export class CollectOrderComponent implements OnInit {
  id = 0;
  generatedPin = '';

  constructor(
    private route: ActivatedRoute,
    private lockerService: LockerService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id') || '');
  }

  getPin() {
    this.lockerService.generatePin(this.id).subscribe({
      next: (data) => {
        if (data) {
          this.generatedPin = data.pin;
          this.alertService.showSuccessToast('Successfully generated pin!');
        }
      },
      error: (data) => {
        console.error(data);
        this.alertService.showErrorToast('Failed to generate pin!');
      }
    });
  }
}
