import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  imports: [],
  templateUrl: './site-footer.component.html',
  styleUrl: './site-footer.component.scss'
})
export class SiteFooterComponent {
  siteFooterNavList: Array<string> = [
    'Privacy Principles',
    'Terms & Conditions',
    'User Guide',
    'Contact Us'
  ];
}
