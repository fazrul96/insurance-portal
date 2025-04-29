import {inject, Injectable} from '@angular/core';
import {ExperienceItem} from '../models/experience-item.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {buildApiUrl} from '../../shared/utils/api-url.utils';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private readonly http = inject(HttpClient);

  getExperienceItems(): Observable<ExperienceItem[]> {
    const endpoint = 'getExperienceItems';
    const url = buildApiUrl(endpoint);
    return this.http.get<ExperienceItem[]>(url);
  }
}
