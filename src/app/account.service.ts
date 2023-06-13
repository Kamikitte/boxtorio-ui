import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'https://localhost:7124/api';

  constructor(private http: HttpClient, private jwt: JwtService) { }

  private getToken(): string {
    const jwt = this.jwt.getToken();
    if(jwt !== null){
      return jwt;
    } else {
      throw new Error('Undefined token')
    }
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    return headers;
  }

  createAccount(name: string, email: string, password: string, retryPassword: string, role: string): Observable<Account> {
    const headers = this.getHeaders();
    const body = JSON.stringify({ name: name, email: email, password: password, retryPassword: retryPassword, role: role });
    return this.http.post<Account>(this.apiUrl + '/Auth/CreateUser', body, { headers: headers });
  }

  getAccounts(): Observable<Account[]> {
    const headers = this.getHeaders();
    return this.http.get<Account[]>(this.apiUrl + '/Account/GetAllAccounts', { headers: headers });
  }  
  
  //getDeliveryPoints(): Observable<DeliveryPoint[]> {
  //  const headers = this.getHeaders();
  //  return this.http.get<DeliveryPoint[]>(this.apiUrl + '/GetDeliveryPoints', { headers: headers });
  //}
}