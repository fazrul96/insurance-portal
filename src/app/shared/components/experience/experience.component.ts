import {Component, inject, OnInit} from '@angular/core';
import {ExperienceItem} from '../../../core/models/experience-item.model';
import {ExperienceService} from '../../../core/services/experience.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [
    AsyncPipe
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  readonly experienceService = inject(ExperienceService);
  experienceItems$: Observable<ExperienceItem[]> | null = null;

  ngOnInit(): void {
    this.experienceItems$ = this.experienceService.getExperienceItems();
  }
}
