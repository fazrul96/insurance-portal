import {Component} from '@angular/core';
import {FileUploaderComponent} from '../../shared/components/file-uploader/file-uploader.component';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {RouterLink} from '@angular/router';
import {NxLayoutComponent} from '@aposin/ng-aquila/grid';

@Component({
  selector: 'app-claim-management',
  imports: [
    FileUploaderComponent,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    NxLayoutComponent
  ],
  templateUrl: './claim-management.component.html',
  styleUrl: './claim-management.component.scss'
})
export class ClaimManagementComponent {
  items: string[] = ['Home', 'Claim Management'];
}
