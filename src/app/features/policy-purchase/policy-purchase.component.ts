import {Component, ViewChild} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {DASHBOARD_CARDS_PRODUCTS} from '../../shared/data/dashboard-cards.data';
import {FormsModule} from '@angular/forms';
import {NxInputDirective} from '@aposin/ng-aquila/input';

@Component({
  selector: 'app-policy-purchase',
  imports: [
    CardComponent,
    FormsModule
  ],
  templateUrl: './policy-purchase.component.html',
  styleUrl: './policy-purchase.component.scss'
})
export class PolicyPurchaseComponent {
  purchaseCards = DASHBOARD_CARDS_PRODUCTS;

  @ViewChild('inputToCount', { read: NxInputDirective, static: true })
  input!: NxInputDirective;
}
