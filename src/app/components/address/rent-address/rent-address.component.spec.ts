import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentAddressComponent } from './rent-address.component';

describe('RentAddressComponent', () => {
  let component: RentAddressComponent;
  let fixture: ComponentFixture<RentAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
