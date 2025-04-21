import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('access_token'); // Or use Okta SDK to get token

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    });

    return this.http.get(`${this.baseUrl}user-info`, { headers });
  }

  getTestMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}/test`, { responseType: 'text' });
  }
}
