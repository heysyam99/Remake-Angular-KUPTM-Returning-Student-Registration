import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailAddressComponent } from './mail-address.component';

describe('MailAddressComponent', () => {
  let component: MailAddressComponent;
  let fixture: ComponentFixture<MailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
