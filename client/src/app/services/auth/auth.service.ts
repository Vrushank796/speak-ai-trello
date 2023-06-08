import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface IAuth {
  success: boolean;
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiURL;
  loginUrl = this.apiUrl + '/api/auth/login';

  login(): Observable<IAuth> {
    console.log('Auth Service' + this.loginUrl);
    return this.http.get<IAuth>(this.loginUrl);
  }
}
