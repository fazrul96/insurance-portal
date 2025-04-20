import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;
  @ViewChild('template2') templateRef2!: TemplateRef<any>;

  templateDialogRef?: NxModalRef<any>;
  componentDialogRef?: NxModalRef<ModalComponent>;

  constructor(private readonly dialogService: NxDialogService) {}

  openFromTemplate(): void {
    this.templateDialogRef = this.dialogService.open(this.templateRef, {
      ariaLabel: 'A simple dialog',
    });
  }

  openFromComponent(): void {
    this.componentDialogRef = this.dialogService.open(
      ModalComponent,
      {
        ariaLabel: 'A simple dialog',
        showCloseIcon: true,
      },
    );
  }

  closeTemplateDialog() {
    this.templateDialogRef?.close();
  }
}
