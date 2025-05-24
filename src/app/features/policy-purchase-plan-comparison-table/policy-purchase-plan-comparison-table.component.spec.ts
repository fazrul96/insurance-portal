import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPurchasePlanComparisonTableComponent } from './policy-purchase-plan-comparison-table.component';

describe('PolicyPurchasePlanComparisonTableComponent', () => {
  let component: PolicyPurchasePlanComparisonTableComponent;
  let fixture: ComponentFixture<PolicyPurchasePlanComparisonTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyPurchasePlanComparisonTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyPurchasePlanComparisonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
