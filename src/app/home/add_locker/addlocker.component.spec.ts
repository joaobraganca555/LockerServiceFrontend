import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlockerComponent } from './addlocker.component';

describe('AddlockerComponent', () => {
  let component: AddlockerComponent;
  let fixture: ComponentFixture<AddlockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlockerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
