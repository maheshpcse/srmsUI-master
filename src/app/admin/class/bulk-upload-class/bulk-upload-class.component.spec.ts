import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadClassComponent } from './bulk-upload-class.component';

describe('BulkUploadClassComponent', () => {
  let component: BulkUploadClassComponent;
  let fixture: ComponentFixture<BulkUploadClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
