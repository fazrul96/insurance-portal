import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
  NxFileUploadConfig,
  NxFileUploader,
  NxFileUploaderButtonDirective,
  NxFileUploaderComponent,
  NxFileUploaderDropZoneComponent,
  NxFileUploaderHintDirective,
  NxFileUploaderTriggerDirective,
} from '@aposin/ng-aquila/file-uploader';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
  NxMessageToastConfig,
  NxMessageToastService,
} from '@aposin/ng-aquila/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 3000,
  context: 'success',
  announcementMessage: 'File was uploaded successfully!',
};

@Component({
  selector: 'app-file-uploader',
  imports: [
    NxFileUploaderComponent,
    NxLabelComponent,
    NxFileUploaderHintDirective,
    NxFileUploaderDropZoneComponent,
    NxCopytextComponent,
    NxButtonComponent,
    NxFileUploaderButtonDirective,
    NxIconComponent,
    NxFileUploaderTriggerDirective,
  ],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss'
})
export class FileUploaderComponent implements OnInit, OnDestroy {
  readonly uploadConfig: NxFileUploadConfig = {
    requestUrl: 'file-upload',
    options: {
      params: new HttpParams(),
      reportProgress: true,
    },
  };

  private readonly _destroyed = new Subject<void>();

  constructor(
    private readonly messageToastService: NxMessageToastService,
    private readonly http: HttpClient,
  ) {}


  // uploader = new NxFileUploader(this.uploadConfig, this.http);
  uploader!: NxFileUploader;

  ngOnInit(): void {
    this.uploader = new NxFileUploader(this.uploadConfig, this.http);
    this.uploader.response
      .pipe(takeUntil(this._destroyed))
      .subscribe(result => {
        if (result.success) {
          this.messageToastService.open(
            'All files were uploaded successfully!',
            myCustomConfig,
          );
        } else if (result.error) {
          // error handling
          console.log(result.error);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
