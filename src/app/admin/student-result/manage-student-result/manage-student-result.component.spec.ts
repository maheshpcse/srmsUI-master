import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStudentResultComponent } from './manage-student-result.component';

describe('ManageStudentResultComponent', () => {
  let component: ManageStudentResultComponent;
  let fixture: ComponentFixture<ManageStudentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStudentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStudentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
