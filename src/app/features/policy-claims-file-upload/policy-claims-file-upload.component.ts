import {AfterViewInit, Component, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  FileItem,
  NxFileUploadConfig,
  NxFileUploader,
  NxFileUploaderButtonDirective,
  NxFileUploaderComponent,
  NxFileUploaderDropZoneComponent,
  NxFileUploaderHintDirective
} from '@aposin/ng-aquila/file-uploader';
import {NxErrorComponent, NxLabelComponent} from '@aposin/ng-aquila/base';
import {NxCopytextComponent} from '@aposin/ng-aquila/copytext';
import {NxButtonComponent} from '@aposin/ng-aquila/button';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subject, takeUntil} from 'rxjs';
import {NxMessageToastService} from '@aposin/ng-aquila/message';
import {PolicyClaimState} from '../../store/policy-claim/policy-claim.state';
import {Store} from '@ngxs/store';
import {NxBadgeComponent} from '@aposin/ng-aquila/badge';
import {NxColComponent, NxLayoutComponent, NxRowComponent} from '@aposin/ng-aquila/grid';
import {NxDialogService, NxModalRef} from '@aposin/ng-aquila/modal';
import {PostSubmitClaim} from '../../store/policy-claim/policy-claim.action';
import {Router} from '@angular/router';
import {ClaimPolicyDocument} from '../../core/models/policy-claim.model';
import {MessageModalData} from '../../core/models/message-modal-data.model';
import {MessageModalComponent} from '../../shared/components/message-modal/message-modal.component';
import {HttpErrorBody} from '../../core/models/http-body.model';

@Component({
  selector: 'app-policy-claims-file-upload',
  imports: [
    NxFileUploaderComponent,
    NxLabelComponent,
    NxFileUploaderHintDirective,
    NxFileUploaderDropZoneComponent,
    NxCopytextComponent,
    NxButtonComponent,
    NxFileUploaderButtonDirective,
    NxIconComponent,
    NxBadgeComponent,
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxErrorComponent,
  ],
  templateUrl: './policy-claims-file-upload.component.html',
  styleUrl: './policy-claims-file-upload.component.scss'
})
export class PolicyClaimsFileUploadComponent implements OnInit, OnDestroy, AfterViewInit  {
  @Input() nextStep!: () => void;
  @Input() prevStep!: () => void;

  @ViewChild('documentUpload') documentUpload!: NxFileUploaderComponent;

  private readonly messageToastService: NxMessageToastService = inject(NxMessageToastService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  private dialogService = inject(NxDialogService);

  private readonly _destroyed = new Subject<void>();
  private dialogRef?: NxModalRef<any>;

  uploader!: NxFileUploader;
  uploadedFiles: FileItem[] = [];

  selectedPolicyId: number = 0;
  selectedTypeOfClaim?: ClaimPolicyDocument;
  requiredDoc?: string[];

  readonly uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportProgress: true,
    },
  };

  ngOnInit(): void {
    this.selectedPolicyId = this.store.selectSnapshot(PolicyClaimState.getSelectedPolicyId);
    this.selectedTypeOfClaim = this.store.selectSnapshot(PolicyClaimState.getSelectedTypeOfClaim);
    this.requiredDoc = this.selectedTypeOfClaim.requiredDocuments;

    this.uploader = new NxFileUploader(this.uploadConfig, this.http);
    this.uploader.response
      .pipe(takeUntil(this._destroyed))
      .subscribe(result => {
      if (result.success) {
        this.messageToastService.open('All files uploaded successfully!', {
          duration: 3000,
          context: 'success',
          announcementMessage: 'Files uploaded.'
        });
      } else if (result.error) {
        console.log('Upload error:', result.error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.documentUpload.valueChange
      .pipe(takeUntil(this._destroyed))
      .subscribe((files: FileItem[]) => {
      this.uploadedFiles = files;
    });
  }

  get uploadedFileNames(): string[] {
    return this.uploadedFiles.map(file => file.name);
  }

  isDocumentUploaded(docName: string): boolean {
    return this.uploadedFiles.some(file =>
      file.name.toLowerCase().includes(docName.toLowerCase())
    );
  }

  getDocumentStatus(docName: string): 'matched' | 'missing' | 'unexpected' {
    if (this.isDocumentUploaded(docName)) return 'matched';
    return 'missing';
  }

  getExtraUploadedFiles(): string[] {
    if (!this.requiredDoc?.length) return this.uploadedFileNames;

    return this.uploadedFileNames.filter(file =>
      !this.requiredDoc!.some(req => file.toLowerCase().includes(req.toLowerCase()))
    );
  }

  hasUploadErrors(): boolean {
    if (!this.requiredDoc?.length || !this.uploadedFileNames.length) return false;

    const hasMissing = this.requiredDoc.some(required =>
      !this.uploadedFileNames.some(uploaded =>
        uploaded.toLowerCase().includes(required.toLowerCase())
      )
    );

    const hasUnexpected = this.uploadedFileNames.some(uploaded =>
      !this.requiredDoc!.some(required =>
        uploaded.toLowerCase().includes(required.toLowerCase())
      )
    );

    return hasMissing || hasUnexpected;
  }


  private openErrorModal(messageData?: MessageModalData): void {
    this.dialogRef = this.dialogService.open(MessageModalComponent, {
      data: messageData,
      disableClose: true,
      ariaLabel: 'Error dialog'
    })
  }

  submit(): void {
    if (this.hasUploadErrors()) return;

    const payload: FormData = this.buildFormData();
    this.store.dispatch(new PostSubmitClaim(payload)).subscribe({
      complete: () => {
        this.messageToastService.open('Claim submitted successfully!', {
          duration: 3000,
          context: 'success',
          announcementMessage: 'Claim submitted.'
        });
        this.router.navigate(['claim-list']);
      },
      error: (err: HttpErrorBody) => {
        const messageData: MessageModalData = {
          header: 'Error',
          message: err.message ?? 'Unexpected error occurred.'
        };
        this.openErrorModal(messageData);
      }
    });
  }

  private buildFormData(): FormData {
    const formData = new FormData();
    formData.append('policyID', String(this.selectedPolicyId));
    formData.append('claimTypeID', String(this.selectedTypeOfClaim?.claimTypeId));

    this.uploadedFiles.forEach(fileItem => {
      if (fileItem.file instanceof File) {
        formData.append('files', fileItem.file, fileItem.file.name);
      }
    });

    return formData;
  }

  onBack(): void {
    this.prevStep();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
