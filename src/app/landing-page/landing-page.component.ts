import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { ApiService } from '../services/api.service';
import { AuthApis } from '../constants/api.constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  user: any;

  constructor(private router: Router, private apiService: ApiService,private authService: AuthServiceService){}

  ngOnInit(){
    this.getLoggedInUser();
  }

  getLoggedInUser(): any{
    this.apiService.get(AuthApis.loggedInUser)
    .subscribe((res: any) => {
      if(res?.success){
        this.user = res?.data;
        this.authService.setUser(res?.data)
      }
    },
    (error) => {
      this.router.navigate(['/login'])
    }
  )
  }

  addBook(){
    this.router.navigate(['/add-book'])
  }
  
}
