import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginConstants } from '../constants/app.constants';
import { ApiService } from '../services/api.service';
import { AuthApis } from '../constants/api.constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;
  requiredFieldsError = false;
  loginCredentials = LoginConstants;

  showAllFields = false;
  wrongEmailError = false;
  resetPasswordData: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private notificationService: ToastrService) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password validation
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]] // Password validation
    });
  }

  forgotPassword(): any{
    let requestObj = {
      email: this.resetPasswordForm.get('email')?.value
    }
    this.apiService.post(AuthApis.forgotPassword, requestObj)
    .subscribe((res: any) => {
      if(res?.success){
        this.resetPasswordData = res?.data;
        this.showAllFields = true;
      }
      else{
        this.showAllFields = false;
        this.wrongEmailError = true
      }
    })
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      let requestObj = {
        password: this.resetPasswordForm.get('password')?.value
      }
      this.apiService.put(AuthApis.resetPassword(this.resetPasswordData?.resetToken), requestObj)
      .subscribe((res: any) => {
        if(res?.success){
          this.notificationService.success('Password Reset Successful!!', 'Success');
          this.navigateToLogin();
        }
        else{
          this.notificationService.error('Some problem encountered', 'Error');
        }
      })
    }
  }

  backToEmail(): void {
    this.showAllFields = false;
  }

  onResetPasswordFormChange(){
    this.wrongEmailError = false;
  }

  checkValidity(){
    return (!this.resetPasswordForm.get('email')?.value || this.resetPasswordForm.get('email')?.invalid || 
    !this.resetPasswordForm.get('password')?.value || this.resetPasswordForm.get('password')?.invalid ||
    !this.resetPasswordForm.get('confirmPassword')?.value || this.resetPasswordForm.get('confirmPassword')?.invalid);
  }

  checkEqualPasswords(){
    if(!this.checkValidity()){
      return this.resetPasswordForm.get('password')?.value !== this.resetPasswordForm.get('confirmPassword')?.value;
    }
    return false;
  }

  validateForm() {
    this.onSubmit();
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

}
