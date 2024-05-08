import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadSchoolComponent } from './bulk-upload-school.component';

describe('BulkUploadSchoolComponent', () => {
  let component: BulkUploadSchoolComponent;
  let fixture: ComponentFixture<BulkUploadSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
