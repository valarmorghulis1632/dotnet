import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private serverInteractor: HttpClient) {

  }

  authenticateUser(data) {
    return this.serverInteractor.post<any>('http://localhost:3000/auth/v1/',data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken',token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.serverInteractor.post<any>('http://localhost:3000/auth/v1/isAuthenticated',{},{
      headers : new HttpHeaders().set('Authorization',`Bearer ${token}`)
    }).pipe(map(response => response.isAuthenticated)).toPromise();
  }

  deleteToken(){
    return localStorage.removeItem('bearerToken');
  }
}
