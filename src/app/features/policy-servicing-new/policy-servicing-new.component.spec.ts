import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyServicingNewComponent } from './policy-servicing-new.component';

describe('PolicyServicingNewComponent', () => {
  let component: PolicyServicingNewComponent;
  let fixture: ComponentFixture<PolicyServicingNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyServicingNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyServicingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
