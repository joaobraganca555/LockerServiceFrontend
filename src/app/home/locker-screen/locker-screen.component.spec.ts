import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerScreenComponent } from './locker-screen.component';

describe('LockerScreenComponent', () => {
  let component: LockerScreenComponent;
  let fixture: ComponentFixture<LockerScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LockerScreenComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LockerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
