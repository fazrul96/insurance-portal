import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NxCardModule} from '@aposin/ng-aquila/card';
import {NxIconModule} from '@aposin/ng-aquila/icon';
import {NxLinkModule} from '@aposin/ng-aquila/link';
import {RouterModule} from '@angular/router';
import {NxHeadlineComponent} from '@aposin/ng-aquila/headline';
import {CardItem} from '../../data/dashboard-cards.data';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCardModule, NxLinkModule, NxIconModule, RouterModule, NxHeadlineComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cards: CardItem[] = [];
}
