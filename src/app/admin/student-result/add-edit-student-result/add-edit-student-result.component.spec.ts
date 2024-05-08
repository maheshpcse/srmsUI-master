import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStudentResultComponent } from './add-edit-student-result.component';

describe('AddEditStudentResultComponent', () => {
  let component: AddEditStudentResultComponent;
  let fixture: ComponentFixture<AddEditStudentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStudentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStudentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
