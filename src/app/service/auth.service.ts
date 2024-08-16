import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../models/AuthResponseData';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_KEY = 'AIzaSyBS3crAmrEUN-KNptDa4UZFO4PGap_qcbk';
  private readonly SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;
  private readonly SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string):Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.SIGN_IN_URL, {
      email,
      password,
      returnSecureToken: true,
    });
  }
  signup(email: string, password: string):Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.SIGN_UP_URL, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  formatUser(data:AuthResponseData){
    const expirationData = new Date(new Date().getTime()+ + data.expiresIn*1000)
    const user  = new User(data.email,data.idToken,data.localId, expirationData);
    return user;
  }
}
