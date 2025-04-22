import { Component } from '@angular/core';
import {NxFigureComponent} from '@aposin/ng-aquila/image';
import {NxIconComponent} from '@aposin/ng-aquila/icon';
import {NxAvatarButtonDirective, NxAvatarComponent} from '@aposin/ng-aquila/avatar';

@Component({
  selector: 'app-avatar',
  imports: [
    NxAvatarButtonDirective,
    NxAvatarComponent,
    NxIconComponent,
    NxFigureComponent,
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {

}
