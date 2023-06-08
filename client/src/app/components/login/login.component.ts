import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  authorizeUser() {
    const apiUrl = environment.apiURL;
    const loginUrl = apiUrl + '/api/auth/login';
    window.location.href = loginUrl;
  }
}
