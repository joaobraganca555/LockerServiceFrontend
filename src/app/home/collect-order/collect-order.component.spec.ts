import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectOrderComponent } from './collect-order.component';

describe('CollectOrderComponent', () => {
  let component: CollectOrderComponent;
  let fixture: ComponentFixture<CollectOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectOrderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
