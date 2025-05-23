import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponseBody} from '../models/http-body.model';
import {environment} from '../../../environments/environment';
import {POLICY_SERVICING_API} from '../../shared/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class PolicyProductService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getAllPolicies(): Observable<HttpResponseBody> {
    return this.http.get<HttpResponseBody>(
      this.apiUrl + POLICY_SERVICING_API.GET_ALL_POLICIES
    );
  }

  postListBeneficiaries(payload: any): Observable<HttpResponseBody> {
    return this.http.post<HttpResponseBody>(
      this.apiUrl + POLICY_SERVICING_API.CREATE_BENEFICIARIES,
      payload
    );
  }

  updateInsuredInfo(policyId: number, updatedInfo: any): Observable<HttpResponseBody> {
    return this.http.patch<HttpResponseBody>(
      this.apiUrl + POLICY_SERVICING_API.UPDATE_INSURED_INFO(policyId), updatedInfo);
  }
}
