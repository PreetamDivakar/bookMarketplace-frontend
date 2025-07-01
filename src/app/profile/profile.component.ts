import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { ApiService } from '../services/api.service';
import { AuthApis } from '../constants/api.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private router: Router, 
    private apiService: ApiService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.getLoggedInUser();
  }

  getLoggedInUser(): any {
    this.apiService.get(AuthApis.loggedInUser)
      .subscribe((res: any) => {
        if (res?.success) {
          this.user = res?.data;
          this.authService.setUser(res?.data);
        }
      },
      (error) => {
        this.router.navigate(['/login']);
      });
  }
} 