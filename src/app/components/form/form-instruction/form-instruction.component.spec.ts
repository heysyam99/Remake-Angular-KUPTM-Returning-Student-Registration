import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInstructionComponent } from './form-instruction.component';

describe('FormInstructionComponent', () => {
  let component: FormInstructionComponent;
  let fixture: ComponentFixture<FormInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
