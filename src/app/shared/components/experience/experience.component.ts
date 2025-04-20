import { Component } from '@angular/core';
import {ExperienceItem} from '../../../core/models/experience-item.model';
import {ExperienceService} from '../../../core/services/experience.service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  // experienceItems: ExperienceItem[] = [];
  experienceItems: ExperienceItem[] = [
    {
      id: 1,
      title: 'Application Developer',
      description: 'Developed AnIML converter plugins in Java.',
      alias: 'acn',
      experience: {
        id: 1,
        companyName: 'Accenture Solutions',
        companyType: 'Sdn. Bhd.',
        role: 'Business & Integration Arch Analyst',
        tag: 'Web Development|Laravel|Java|PHP|JavaScript|Cypress|MySQL|Unit Testing|Data Manipulation',
        year: null,
        startdate: '2024-03-18 10:22:38',
        enddate: '2024-03-18 10:22:38',
        duration: '1 yrs 4 mo',
        image: 'https://cdnv2.dropr.io/image/7m-VCLUpSjG3z_tAei75rg/Iagvf8Qx/1200x630/sf/f78e1fde-bff5-4287-9476-9db5f6b6a1ef.jpg?cache_buster=39dfa55283318d31afe5a3ff4a0e3253e2045e43',
        alias: 'acn'
      }
    }
  ];

  constructor(private experienceService: ExperienceService) {}

  // ngOnInit(): void {
  //   this.experienceService.getExperienceItems().subscribe({
  //     next: data => this.experienceItems = data,
  //     error: err => console.error('Error loading experience data', err)
  //   });
  // }
}
