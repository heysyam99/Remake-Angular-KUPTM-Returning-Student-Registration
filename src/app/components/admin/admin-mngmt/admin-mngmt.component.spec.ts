import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMngmtComponent } from './admin-mngmt.component';

describe('AdminMngmtComponent', () => {
  let component: AdminMngmtComponent;
  let fixture: ComponentFixture<AdminMngmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMngmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMngmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
