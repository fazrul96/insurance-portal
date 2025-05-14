import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime, Subject, takeUntil} from 'rxjs';
import {PolicyPurchaseState} from '../../store/policy/policy-purchase.state';
import {GetTermsAndConditions, SubmitPersonalDetailsInfo} from '../../store/policy/policy-purchase.action';
import {NxButtonComponent, NxIconButtonComponent} from '@aposin/ng-aquila/button';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {NxDropdownComponent, NxDropdownItemComponent} from '@aposin/ng-aquila/dropdown';
import {NxFormfieldAppendixDirective, NxFormfieldComponent} from '@aposin/ng-aquila/formfield';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {NxInputDirective} from '@aposin/ng-aquila/input';
import {NxPopoverComponent, NxPopoverTriggerDirective} from '@aposin/ng-aquila/popover';
import {NxStepperPreviousDirective} from '@aposin/ng-aquila/progress-stepper';
import {NxSwitcherComponent} from '@aposin/ng-aquila/switcher';
import {NgClass} from '@angular/common';
import {NxErrorComponent} from '@aposin/ng-aquila/base';
import {NxRadioToggleButtonComponent, NxRadioToggleComponent} from '@aposin/ng-aquila/radio-toggle';
import {NricPipe} from '../../shared/pipes/nric.pipe';
import {PolicyService} from '../../core/services/policy.service';
import {IdType} from '../../shared/enums/id-type.enum';
import {nricValidator} from '../../shared/validators/nric.validator';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {PolicyPersonalDetails} from '../../core/models/policy.model';

@Component({
  selector: 'app-policy-purchase-insured-info',
  imports: [
    NxFormfieldComponent,
    NxButtonComponent,
    NxStepperPreviousDirective,
    NxInputDirective,
    ReactiveFormsModule,
    NxColComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxFormfieldAppendixDirective,
    NxIconButtonComponent,
    NxIconComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxSwitcherComponent,
    NxPopoverComponent,
    NxPopoverTriggerDirective,
    NgClass,
    NxErrorComponent,
    NxRadioToggleComponent,
    NxRadioToggleButtonComponent
  ],
  providers: [NricPipe],
  templateUrl: './policy-purchase-insured-info.component.html',
  styleUrl: './policy-purchase-insured-info.component.scss'
})
export class PolicyPurchaseInsuredInfoComponent implements OnInit, OnDestroy {
  @Input() prevStep!: () => void;
  @Input() nextSubStep!: () => void;

  store: Store = inject(Store);
  formBuilder: FormBuilder = inject(FormBuilder);
  policyService: PolicyService = inject(PolicyService);
  nricPipe: NricPipe = inject(NricPipe);

  personalDetailsForm!: FormGroup;

  idType: typeof IdType = IdType;
  unsubscribe$ = new Subject();
  usPersonError: boolean = false;
  emailError: boolean = false;
  idNoError: boolean = false;
  submitted = false;

  readonly data = ['Male', 'Female'];
  FIELD_OPTIONS = {
    title: [
      { value: 'Mr', label: 'Mr' },
      { value: 'Mrs', label: 'Mrs' },
    ],
    nationality: [
      { value: 'Malaysia', label: 'Malaysia' },
    ],
    countryOfBirth: [
      { value: 'Malaysia', label: 'Malaysia' },
    ],
    countryCode: [
      { value: '60', label: '60' },
    ],
    occupation: [
      { value: 'H001', label: 'Administrators' },
      { value: 'H002', label: 'Analyst (System/Financial/Business)' },
      { value: 'H003', label: 'Assistant (Dental/Lab/Legal/Shop/Accounts)' },
      { value: 'H004', label: 'Babysitter' },
      { value: 'H005', label: 'Banker' },
      { value: 'H006', label: 'Beautician/Make-up Artist' },
    ],
    transactionPurpose: [
      { value: 'PRO', label: 'Protection' },
      { value: 'PRORET', label: 'Protection, Retirement' },
      { value: 'LOANPRO', label: 'Loan Protection' },
      { value: 'PROSAVINV', label: 'Protection, Savings, Investment' },
      { value: 'EDU', label: 'Education' },
      { value: 'PART', label: 'Partnership' },
      { value: 'EB', label: 'Employee Benefit' },
      { value: 'KEYM', label: 'Keyman' },
      { value: 'OTH', label: 'Others' },
    ],
  };

  initForms(): void {
    this.personalDetailsForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required),
      idNo: new FormControl('', {
        validators: [Validators.required, nricValidator()],
      }),
      otherId: new FormControl(''),
      isUsPerson: new FormControl(false),
      countryOfBirth: new FormControl('', Validators.required),
      isSmoker: new FormControl(false),
      cigarettesPerDay: new FormControl(0),
      countryCode: new FormControl(''),
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
      occupation: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      transactionPurpose: new FormControl('', Validators.required),
    });

    this.formBuilder.group({
      personalDetails: this.personalDetailsForm,
    });
  }

  populateFormFieldsFromState(): void {
    const disableFields = ['gender', 'dateOfBirth'];

    this.store.select(PolicyPurchaseState.getPersonalDetails)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(details => {
        if (!details) return;

        Object.entries(details).forEach(([key, value]) => {
          const control = this.personalDetailsForm.get(key);
          if (control) {
            control.setValue(value);
            if (disableFields.includes(key)) {
              control.disable();
            }
          }
        });
      });
  }

  onFormChange(): void {
    this.handleIdNoChanges();
    this.handleSmokerToggle();
    this.handleUsPersonToggle();
    this.handleEmailValidation();
  }

  handleIdNoChanges(): void {
    this.personalDetailsForm.get('idNo')?.valueChanges
      .pipe(debounceTime(800), takeUntil(this.unsubscribe$))
      .subscribe(value => this.validateAndFormatIdNo(value));
  }

  handleSmokerToggle(): void {
    this.personalDetailsForm.get('isSmoker')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isSmoker => {
        const control = this.personalDetailsForm.get('cigarettesPerDay');
        if (isSmoker) {
          control?.enable();
        } else {
          control?.disable();
          control?.setValue(0);
        }
      });
  }

  handleUsPersonToggle(): void {
    this.personalDetailsForm.get('isUsPerson')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isUs => this.usPersonError = isUs);
  }

  handleEmailValidation(): void {
    this.personalDetailsForm.get('email')?.statusChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        const emailControl = this.personalDetailsForm.get('email');
        this.emailError = !!emailControl?.invalid && emailControl.touched;
      });
  }

  validateAndFormatIdNo(value: string): void {
    const formattedString = this.nricPipe.transform(value);

    this.personalDetailsForm.patchValue({idNo: formattedString}, {emitEvent: false});

    const gender = this.personalDetailsForm.get('gender')?.value;
    const dob = this.personalDetailsForm.get('dateOfBirth')?.value;

    if (gender && dob && formattedString) {
      const isValid = this.nricPipe.validateNric(formattedString, gender, dob);

      this.idNoError = !isValid;
      if (this.idNoError) {
        this.personalDetailsForm.get('idNo')?.setErrors({invalidNric: true});
      } else {
        this.personalDetailsForm.get('idNo')?.setErrors(null);
      }
    }
  }

  getAgeFromSession(): number | undefined {
    return this.store.selectSnapshot(PolicyPurchaseState.getAge);
  }

  getTermsandConditions(): void {
    this.policyService.getTermsAndConditions().subscribe({
      next: (response: HttpResponseBody): void => {
        const isSuccess: boolean = response?.code === 200 && response?.data;
        if (isSuccess) {
          const termsAndConditions = response?.data;
          this.store.dispatch(new GetTermsAndConditions(termsAndConditions));
          this.nextSubStep();
        } else {
          console.warn('⚠️ API responded with an unexpected status or missing data:', response?.message);
        }
      },
      error: (error): void => {
        console.error('❌ API call failed:', error);
      }
    });
  }

  onSubmit(): void{
    this.submitted = true;

    if (this.personalDetailsForm.invalid) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      console.log("Form is invalid, cannot proceed.");
      return;
    }

    this.submitForm();
    this.getTermsandConditions();
  }

  submitForm(): void {
    const formValue = this.personalDetailsForm.getRawValue();
    const payload: PolicyPersonalDetails = {
      ...formValue,
      age: this.getAgeFromSession(),
    };
    this.store.dispatch(new SubmitPersonalDetailsInfo(payload));
  }

  onBack(): void {
    this.prevStep();
  }

  ngOnInit(): void {
    this.initForms();
    this.onFormChange();
    this.populateFormFieldsFromState();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}
