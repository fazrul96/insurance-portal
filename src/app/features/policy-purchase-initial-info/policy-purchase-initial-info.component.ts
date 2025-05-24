import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NxButtonComponent} from '@aposin/ng-aquila/button';
import {NxDropdownComponent, NxDropdownItemComponent,} from '@aposin/ng-aquila/dropdown';
import {NxFormfieldComponent, NxFormfieldModule, NxFormfieldSuffixDirective,} from '@aposin/ng-aquila/formfield';
import {NxInputDirective} from '@aposin/ng-aquila/input';
import {
  NxDatefieldDirective,
  NxDatefieldModule,
  NxDatepickerComponent,
  NxDatepickerToggleComponent,
  NxNativeDateModule,
} from '@aposin/ng-aquila/datefield';
import {NxErrorComponent} from '@aposin/ng-aquila/base';
import {Router, RouterModule} from '@angular/router';
import {Store} from '@ngxs/store';
import {PostQuotationPlans} from '../../store/policy/policy-purchase.action';
import {PolicyPurchaseState} from '../../store/policy/policy-purchase.state';
import {Subject, takeUntil} from 'rxjs';
import {HttpErrorBody} from '../../core/models/http-body.model';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {NxDialogService, NxModalRef} from '@aposin/ng-aquila/modal';
import {MessageModalData} from '../../core/models/message-modal-data.model';
import {MessageModalComponent} from '../../shared/components/message-modal/message-modal.component';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {NgClass} from '@angular/common';
import {formatBirthdate} from '../../shared/utils/date-utils';

@Component({
  selector: 'app-policy-purchase-initial-info',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxFormfieldComponent,
    NxDatefieldDirective,
    NxInputDirective,
    NxDatepickerToggleComponent,
    NxFormfieldSuffixDirective,
    NxDatepickerComponent,
    NxErrorComponent,
    NxFormfieldComponent,
    NxButtonComponent,
    NxFormfieldModule,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxDatefieldModule,
    NxNativeDateModule,
    NxDatepickerComponent,
    RouterModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxIconComponent,
    NgClass,
  ],
  templateUrl: './policy-purchase-initial-info.component.html',
  styleUrl: './policy-purchase-initial-info.component.scss',
})
export class PolicyPurchaseInitialInfoComponent implements OnInit, OnDestroy {
  @Input() nextStep!: () => void;
  @Input() prevStep!: () => void;

  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private dialogService = inject(NxDialogService);
  private dialogRef?: NxModalRef<any>;
  unsubscribe$ = new Subject();

  infoForm!: FormGroup;
  submitted: boolean = false;

  today: Date = new Date();
  minAge: number = 18;
  maxAge: number = 65;
  maxDate: Date;
  minDate: Date;

  constructor() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.today.getFullYear() - this.minAge);

    this.minDate = new Date();
    this.minDate.setFullYear(this.today.getFullYear() - this.maxAge);
  }

  onNext(): void {
    this.submitted = true;

    if (this.infoForm.invalid) {
      this.infoForm.markAllAsTouched();
      return;
    }

    const { gender, birthDate } = this.infoForm.value;

    const payload = {
      gender: gender.toUpperCase(),
      dateOfBirth: formatBirthdate(birthDate)
    };

    this.store.dispatch(new PostQuotationPlans(payload)).subscribe({
      next: () => {this.nextStep();},
      error: (err: HttpErrorBody) => {
        const messageData: MessageModalData = {
          header: 'Error',
          message: err.message ?? 'Unexpected error occurred.'
        };
        this.openErrorModal(messageData);
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }

  private dateRangeValidator(min: Date, max: Date) {
    return (control: any) => {
      const value = new Date(control.value);
      if (isNaN(value.getTime())) return { invalidDate: true };
      if (value < min || value > max) return { outOfRange: true };
      return null;
    };
  }

  private openErrorModal(messageData?: MessageModalData): void {
    this.dialogRef = this.dialogService.open(MessageModalComponent, {
      data: messageData,
      disableClose: true,
      ariaLabel: 'Error dialog'
    })
  }

  private initializeForm(): void {
    this.infoForm = new FormGroup({
      gender: new FormControl('', Validators.required),
      birthDate: new FormControl('', [
        Validators.required,
        this.dateRangeValidator(this.minDate, this.maxDate),
      ])
    });
  }

  private loadInitialData(): void {
    this.store.select(PolicyPurchaseState.getGender)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(gender => this.infoForm.get('gender')?.setValue(gender));

    this.store.select(PolicyPurchaseState.getDateOfBirth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(dobString => {
        if (dobString) {
          const [day, month, year] = dobString.split('/');
          this.infoForm.get('birthDate')?.setValue(new Date(+year, +month - 1, +day));
        }
      });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('');
    this.unsubscribe$.complete();
  }
}
