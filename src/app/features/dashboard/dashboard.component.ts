import {Component} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {CardItem, DASHBOARD_CARDS} from '../../shared/data/dashboard-cards.data';
import {AuthComponent} from '../../shared/components/auth/auth.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardComponent,
    AuthComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardCards: CardItem[] = DASHBOARD_CARDS;
}
