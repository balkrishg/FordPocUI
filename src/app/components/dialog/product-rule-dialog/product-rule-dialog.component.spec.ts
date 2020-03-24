import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRuleDialogComponent } from './product-rule-dialog.component';

describe('ProductRuleDialogComponent', () => {
  let component: ProductRuleDialogComponent;
  let fixture: ComponentFixture<ProductRuleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRuleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
