import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNoticeComponent } from './add-edit-notice.component';

describe('AddEditNoticeComponent', () => {
  let component: AddEditNoticeComponent;
  let fixture: ComponentFixture<AddEditNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
