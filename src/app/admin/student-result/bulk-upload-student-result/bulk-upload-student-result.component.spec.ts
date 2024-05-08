import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadStudentResultComponent } from './bulk-upload-student-result.component';

describe('BulkUploadStudentResultComponent', () => {
  let component: BulkUploadStudentResultComponent;
  let fixture: ComponentFixture<BulkUploadStudentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadStudentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadStudentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
