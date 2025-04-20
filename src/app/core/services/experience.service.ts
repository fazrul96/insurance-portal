import { Injectable } from '@angular/core';
import {ExperienceItem} from '../models/experience-item.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private apiUrl = 'http://localhost:8080/api/v2/getExperienceItems';

  constructor(private http: HttpClient) {}

  getExperienceItems(): Observable<ExperienceItem[]> {
    return this.http.get<ExperienceItem[]>(this.apiUrl);
  }
}
