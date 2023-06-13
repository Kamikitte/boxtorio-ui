import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { switchMap, mergeMap, map, toArray } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { Box, BoxWithPlace } from './box';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class BoxesService {

  private apiUrl = 'https://localhost:7124/api';

  private deliveryPointId? : string;

  constructor(private http: HttpClient, private jwt: JwtService) {  
    const headers = this.getHeaders();  
    this.http.get<string>(this.apiUrl + '/DeliveryPoint/GetMyDeliveryPointId', { headers: headers })
      .subscribe((result) => {
        this.deliveryPointId = result;
      });
  }

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

  addBox(placeId: string, customerId: string, orderId: string, packageId: string): Observable<Box> {    
    const headers = this.getHeaders();
    const body = JSON.stringify({ DeliveryPointId: this.deliveryPointId, PlaceId: placeId, 
      CustomerId: customerId, OrderId: orderId, PackageId: packageId });
    return this.http.post<Box>(this.apiUrl + '/Box/AddBox', body, { headers: headers });
  }

  getBoxes(): Observable<Box[]> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/Box/GetBoxesFromDP?dpid=${this.deliveryPointId}`;
    return this.http.post<Box[]>(url, null, { headers: headers });
  }  
  
  changeBox(box: Box): Observable<Box> {
    const headers = this.getHeaders();
    return this.http.post<Box>(this.apiUrl + '/Box/ChangeBox', box, { headers: headers });
  }

  removeBox(boxid: string): Observable<Box> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/Box/RemoveBox?boxid=${boxid}`;
    return this.http.post<Box>(url, null, { headers: headers });
  }

  getPlaceAutomated(customerId: number){
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/Box/GetPlaceAutomated?dpid=${this.deliveryPointId}&customerId=${customerId}`;
    return this.http.post<Place>(url, null, { headers: headers });
  }

  getBoxPosition(boxid: string){
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/Box/GetBoxPosition?boxid=${boxid}`;
    return this.http.get<Place>(url, { headers: headers });
  }

  getBoxesWithPlace(): Observable<BoxWithPlace[]> {
    return this.getBoxes().pipe(
      switchMap((boxes: Box[]) =>
        Observable.create((observer: any) => {
          const observables: Observable<Place>[] = [];

          // Создание потоков Observable для каждого объекта Box
          boxes.forEach((box: Box) => {
            observables.push(this.getBoxPosition(box.id));
          });

          // Объединение потоков Observable объектов Place с соответствующими объектами Box
          merge(...observables).pipe(
            mergeMap((place: Place, i: number) =>
              Observable.create((observer2: any) => {
                observer2.next({
                  ...boxes[i],
                  place,
                });
                observer2.complete();
              })
            ),
            toArray()
          ).subscribe(observer);
        })
      ),
      map((boxesWithPlace: unknown) => boxesWithPlace as BoxWithPlace[]) // явное указание типа возвращаемого значения
    );
  }

}