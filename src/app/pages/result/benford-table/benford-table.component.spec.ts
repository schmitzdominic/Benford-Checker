import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenfordTableComponent } from './benford-table.component';

describe('BenfordTableComponent', () => {
  let component: BenfordTableComponent;
  let fixture: ComponentFixture<BenfordTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenfordTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenfordTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
