import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NxDialogService, NxModalRef} from '@aposin/ng-aquila/modal';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';
import {NxCopytextComponent} from '@aposin/ng-aquila/copytext';
import {NxButtonComponent} from '@aposin/ng-aquila/button';

@Component({
  selector: 'app-modal',
  imports: [
    NxHeadlineComponent,
    NxCopytextComponent,
    NxButtonComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;
  @ViewChild('template2') templateRef2!: TemplateRef<any>;

  templateDialogRef?: NxModalRef<any>;

  constructor(private readonly dialogService: NxDialogService) {}

  openFromTemplate(): void {
    this.templateDialogRef = this.dialogService.open(this.templateRef, {
      ariaLabel: 'A simple dialog',
    });
  }

  closeTemplateDialog() {
    this.templateDialogRef?.close();
  }
}
