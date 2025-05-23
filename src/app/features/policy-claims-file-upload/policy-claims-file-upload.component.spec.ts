import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyClaimsFileUploadComponent } from './policy-claims-file-upload.component';

describe('PolicyClaimsFileUploadComponent', () => {
  let component: PolicyClaimsFileUploadComponent;
  let fixture: ComponentFixture<PolicyClaimsFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyClaimsFileUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyClaimsFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
