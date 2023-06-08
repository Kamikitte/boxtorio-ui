import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_URL = 'https://localhost:7124';

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  login(username: string, password: string): Observable<boolean> {
    const body = {login : username, password: password}
    return this.http.post<{accessToken: string}>(this.LOGIN_URL + "/api/Auth/Token", body)
      .pipe(
        map(response => {
          const token = response.accessToken;
          if (token != undefined) {       
            this.jwtService.saveToken(token);
            this.jwtService.saveUserRole(token);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    this.jwtService.destroyToken();
    this.jwtService.destroyUserRole();
  }

  isLoggedIn(): boolean {
    const token = this.jwtService.getToken();
    return !!token;
  }

  getRole(): string | null{
    return this.jwtService.getUserRole();
  }
}