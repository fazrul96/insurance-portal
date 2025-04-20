import {Component} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {DASHBOARD_CARDS_PRODUCTS} from '../../shared/data/dashboard-cards.data';
import {FormComponent} from '../../shared/components/form/form.component';

@Component({
  selector: 'app-policy-purchase',
  imports: [
    CardComponent,
    FormComponent
  ],
  templateUrl: './policy-purchase.component.html',
  styleUrl: './policy-purchase.component.scss'
})
export class PolicyPurchaseComponent {
  purchaseCards = DASHBOARD_CARDS_PRODUCTS;
}
