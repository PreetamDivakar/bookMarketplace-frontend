import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './auth.guard';
import { AddBookComponent } from './add-book/add-book.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', redirectTo:'/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'home', component: LandingPageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-book', component: AddBookComponent, canActivate: [AuthGuard]
  },
  {
    path: 'book-details/:id', component: AddBookComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit-book/:id', component: AddBookComponent, canActivate: [AuthGuard]
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
