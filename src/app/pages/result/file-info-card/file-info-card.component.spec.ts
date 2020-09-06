import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInfoCardComponent } from './file-info-card.component';

describe('FileInfoCardComponent', () => {
  let component: FileInfoCardComponent;
  let fixture: ComponentFixture<FileInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
