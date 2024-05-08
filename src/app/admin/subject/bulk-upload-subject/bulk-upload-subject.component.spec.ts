import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadSubjectComponent } from './bulk-upload-subject.component';

describe('BulkUploadSubjectComponent', () => {
  let component: BulkUploadSubjectComponent;
  let fixture: ComponentFixture<BulkUploadSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
