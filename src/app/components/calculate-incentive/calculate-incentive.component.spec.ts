import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateIncentiveComponent } from './calculate-incentive.component';

describe('CalculateIncentiveComponent', () => {
  let component: CalculateIncentiveComponent;
  let fixture: ComponentFixture<CalculateIncentiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateIncentiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateIncentiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
