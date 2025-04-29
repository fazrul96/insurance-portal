import {Component} from '@angular/core';
import {PolicyServicingNewComponent} from '../policy-servicing-new/policy-servicing-new.component';

@Component({
  selector: 'app-policy-servicing',
  imports: [
    PolicyServicingNewComponent
  ],
  templateUrl: './policy-servicing.component.html',
  styleUrl: './policy-servicing.component.scss'
})
export class PolicyServicingComponent {
  items: string[] = ['Home', 'Policy Servicing'];
}
