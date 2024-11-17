import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginConstants } from '../constants/app.constants';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthApis } from '../constants/api.constants';
import { AuthServiceService } from '../auth/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  requiredFieldsError = false;
  loginCredentials = LoginConstants;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private authService: AuthServiceService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]] // Password validation
    });
  }

  ngOnInit() {
    let _user = {
      email: this.loginCredentials.email,
      password: this.loginCredentials.password
    }
    localStorage.setItem("userDetails", JSON.stringify(_user));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.apiService.post(AuthApis.login, this.loginForm.value)
        .subscribe((res: any) => {
          if (res?.success) {
            this.authService.setToken(res?.token);
            this.router.navigate(['/home']);
          }
          else {
            this.requiredFieldsError = true;
            this.authService.removeToken();
          }
        },
        (error: any) => {
          this.requiredFieldsError = true;
          this.authService.removeToken();
        }
      )
    }
  }

  validateForm() {
    this.onSubmit();
  }

  onLoginFormChange() {
    this.requiredFieldsError = false;
  }

  navigateToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
