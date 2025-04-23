import {Component, inject, OnInit} from '@angular/core';
import {CardComponent} from '../../shared/components/card/card.component';
import {CardItem, DASHBOARD_CARDS} from '../../shared/data/dashboard-cards.data';
import {InsuranceService} from '../../core/services/insurance.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardComponent,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  auth: AuthService = inject(AuthService);
  insuranceService: InsuranceService = inject(InsuranceService)

  dashboardCards: CardItem[] = DASHBOARD_CARDS;
  insuranceTypes$: Observable<CardItem[]> | null = null;
  isAuthenticated = false;

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
    this.insuranceTypes$ = this.insuranceService.getInsuranceTypes();
  }
}
