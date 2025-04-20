import {Component} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {DASHBOARD_CARDS} from '../../shared/data/dashboard-cards.data';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dashboardCards = DASHBOARD_CARDS;
}
