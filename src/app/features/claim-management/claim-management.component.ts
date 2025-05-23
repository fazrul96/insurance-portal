import {Component, inject, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {NxDialogService, NxModalRef} from '@aposin/ng-aquila/modal';
import {Store} from '@ngxs/store';
import {NxTabComponent, NxTabGroupComponent} from '@aposin/ng-aquila/tabs';
import {
  NxSortDirective,
  NxSortHeaderComponent,
  NxTableCellComponent,
  NxTableComponent,
  SortDirection,
  SortEvent
} from '@aposin/ng-aquila/table';
import {NxBadgeComponent} from '@aposin/ng-aquila/badge';
import {getClaimList} from '../../store/policy-claim/policy-claim.action';
import {PolicyClaimState} from '../../store/policy-claim/policy-claim.state';
import {MessageModalData} from '../../core/models/message-modal-data.model';
import {MessageModalComponent} from '../../shared/components/message-modal/message-modal.component';

@Component({
  selector: 'app-claim-management',
  imports: [
    NxLayoutComponent,
    NxColComponent,
    NxTabGroupComponent,
    NxTabComponent,
    NxSortDirective,
    NxTableCellComponent,
    NxBadgeComponent,
    NxSortHeaderComponent,
    NxTableComponent,
    NxRowComponent
  ],
  templateUrl: './claim-management.component.html',
  styleUrl: './claim-management.component.scss'
})
export class ClaimManagementComponent implements OnInit {
  @Input() claimList: any;

  private store: Store = inject(Store);
  private dialogService:NxDialogService = inject(NxDialogService);

  dialogRef?: NxModalRef<any>;

  items: string[] = ['Home', 'Claim Management'];

  ngOnInit(): void {
    this.store.dispatch(new getClaimList).subscribe({
      complete: () => {
        this.claimList = this.store.selectSnapshot(PolicyClaimState.getClaimList);
      },
      error: (err) => {
        const messageData: MessageModalData = {
          header: 'Error',
          message: err.message ?? 'Unexpected error occurred.'
        };
        this.openErrorModal(messageData);
      }
    });
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // Scroll to top
      }
    });
  }

  private openErrorModal(messageData?: MessageModalData): void {
    this.dialogRef = this.dialogService.open(MessageModalComponent, {
      data: messageData,
      disableClose: true,
      ariaLabel: 'Error dialog'
    })
  }

  goToSubmit(): void {
    this.router.navigate(['policy-claims-submission']);
  }

  goToDetails(claimId: string): void {
    this.router.navigate(['claim-details',claimId]);
  }

  sortTable(sort: SortEvent): void {
    const { active, direction } = sort;

    if (!active || direction === null) return;

    this.claimList = [...(this.claimList || [])].sort((a, b) => {
      const aValue = this.getValueByPath(a, active);
      const bValue = this.getValueByPath(b, active);
      return this.compare(aValue, bValue, direction);
    });
  }

  private compare(a: any, b: any, direction: SortDirection): number {
    if (a == null) return direction === 'asc' ? -1 : 1;
    if (b == null) return direction === 'asc' ? 1 : -1;
    if (a < b) return direction === 'asc' ? -1 : 1;
    if (a > b) return direction === 'asc' ? 1 : -1;
    return 0;
  }

  private getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], obj);
  }
}
