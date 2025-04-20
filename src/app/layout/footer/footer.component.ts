import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NxFooterComponent, NxFooterLinkDirective, NxFooterNavigationDirective,} from '@aposin/ng-aquila/footer';

@Component({
  selector: 'app-footer',
  imports: [
    NxFooterComponent,
    NxFooterNavigationDirective,
    NxFooterLinkDirective,
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
