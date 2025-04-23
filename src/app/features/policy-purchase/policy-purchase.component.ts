import {Component, ViewChild} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {DASHBOARD_CARDS_PRODUCTS} from '../../shared/data/dashboard-cards.data';
import {FormsModule} from '@angular/forms';
import {NxInputDirective} from '@aposin/ng-aquila/input';
import {NxBreadcrumbComponent, NxBreadcrumbItemComponent} from '@aposin/ng-aquila/breadcrumb';
import {RouterLink} from '@angular/router';
import {ModalComponent} from '../../shared/components/modal/modal.component';
import {NxLayoutComponent} from '@aposin/ng-aquila/grid';

@Component({
  selector: 'app-policy-purchase',
  imports: [
    CardComponent,
    FormsModule,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    RouterLink,
    ModalComponent,
    NxLayoutComponent
  ],
  templateUrl: './policy-purchase.component.html',
  styleUrl: './policy-purchase.component.scss'
})
export class PolicyPurchaseComponent {
  items: string[] = ['Home', 'Policy Purchase'];
  purchaseCards = DASHBOARD_CARDS_PRODUCTS;

  @ViewChild('inputToCount', { read: NxInputDirective, static: true })
  input!: NxInputDirective;
}
