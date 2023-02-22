import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldOrderComponent } from './hold-order.component';

describe('HoldOrderComponent', () => {
  let component: HoldOrderComponent;
  let fixture: ComponentFixture<HoldOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoldOrderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HoldOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
