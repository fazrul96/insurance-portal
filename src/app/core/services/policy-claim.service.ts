import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponseBody} from '../models/http-body.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {POLICY_CLAIM_API} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class PolicyClaimService {
  private apiUrl: string = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getPolicyClaimDoc(): Observable<HttpResponseBody> {
    return this.http.get<HttpResponseBody>(
      this.apiUrl + POLICY_CLAIM_API.CREATE_CLAIM_POLICY_DOCUMENT
    );
  }

  getClaimList(): Observable<HttpResponseBody>{
    return this.http.get<HttpResponseBody>(
      this.apiUrl + POLICY_CLAIM_API.GET_CLAIM_LIST
    );
  }

  postSubmitClaim(payload: any): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      this.apiUrl + POLICY_CLAIM_API.CLAIM_SUBMIT, payload
    );
  }
}
