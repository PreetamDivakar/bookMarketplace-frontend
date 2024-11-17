import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginConstants } from '../constants/app.constants';
import { ApiService } from '../services/api.service';
import { AuthApis } from '../constants/api.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  requiredFieldsError = false;
  loginCredentials = LoginConstants;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private notificationService: ToastrService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Password validation
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]] // Password validation
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let request = {
        firstName: this.registerForm.get('firstName')?.value, 
        lastName: this.registerForm.get('lastName')?.value, 
        email: this.registerForm.get('email')?.value, 
        password: this.registerForm.get('password')?.value, 
        role: 'user', 
      }
      this.apiService.post(AuthApis.register, request)
      .subscribe((res: any) => {
        if(res?.success){
          this.notificationService.success('User Registered Successfully', 'Success');
          this.navigateToLogin();
        }
        else{
          this.notificationService.error('Some problem encountered', 'Error');

        }
      })
      // You can also handle your submission logic here
    }
  }

  validateForm() {
    this.onSubmit()
  }
  
  checkValidity(){
    return (!this.registerForm.get('firstName')?.value || !this.registerForm.get('lastName')?.value || 
    !this.registerForm.get('email')?.value || this.registerForm.get('email')?.invalid || 
    !this.registerForm.get('password')?.value || this.registerForm.get('password')?.invalid ||
    !this.registerForm.get('confirmPassword')?.value || this.registerForm.get('confirmPassword')?.invalid);
  }

  checkEqualPasswords(){
    if(!this.checkValidity()){
      return this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value;
    }
    return false;
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}
