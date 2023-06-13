import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryPoint } from './delivery-point';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class DpointsService {

  private apiUrl = 'https://localhost:7124/api/DeliveryPoint';

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

  createDeliveryPoint(address: string): Observable<DeliveryPoint> {
    const headers = this.getHeaders();
    const body = JSON.stringify({ address: address });
    return this.http.post<DeliveryPoint>(this.apiUrl + '/Create', body, { headers: headers });
  }

  assignWorker(workerId: string, dpid: string): Observable<DeliveryPoint> {
    const url = `${this.apiUrl}/AssignWorker?workerid=${workerId}&deliverypointid=${dpid}`;
    const headers = this.getHeaders();
    return this.http.post<DeliveryPoint>(url, null, { headers: headers });
  }  
  
  getDeliveryPoints(): Observable<DeliveryPoint[]> {
    const headers = this.getHeaders();
    return this.http.get<DeliveryPoint[]>(this.apiUrl + '/GetDeliveryPoints', { headers: headers });
  }

  getDeliveryPoint(id: string): Observable<DeliveryPoint> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/GetDeliveryPoint?id=${id}`;
    return this.http.post<DeliveryPoint>(url, null, { headers: headers });
  }
}
