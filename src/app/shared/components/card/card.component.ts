import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NxCardModule} from '@aposin/ng-aquila/card';
import {NxIconModule} from '@aposin/ng-aquila/icon';
import {NxLinkModule} from '@aposin/ng-aquila/link';
import {RouterModule} from '@angular/router';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';
import {CardItem} from '../../data/dashboard-cards.data';
import {NxLayoutComponent} from '@aposin/ng-aquila/grid';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCardModule, NxLinkModule, NxIconModule, RouterModule, NxHeadlineComponent, NxLayoutComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  selectedCard: any = null;
  @Input() cards: CardItem[] = [];
  onCardClick(card: any) {
    this.selectedCard = card;
  }
}
