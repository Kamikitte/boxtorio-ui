import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface DecodedToken {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly USER_ROLE = 'USER_ROLE';

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  saveToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  destroyToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE);
  }

  getRoleFromToken(token: string): string {  
    const decodedToken : DecodedToken = jwt_decode(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role;
  }  

  saveUserRole(token: string) {
    const role = this.getRoleFromToken(token);
    localStorage.setItem(this.USER_ROLE, role);
  }

  destroyUserRole() {
    localStorage.removeItem(this.USER_ROLE);
  }
}
