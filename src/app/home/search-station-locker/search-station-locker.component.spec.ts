import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStationLockerComponent } from './search-station-locker.component';

describe('SearchStationLockerComponent', () => {
  let component: SearchStationLockerComponent;
  let fixture: ComponentFixture<SearchStationLockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchStationLockerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchStationLockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
