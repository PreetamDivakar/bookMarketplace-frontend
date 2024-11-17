import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
// import { HeaderComponent } from './header/header.component';
import { BookListingComponent } from './book-listing/book-listing.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BookLandingPageComponent } from './book-landing-page/book-landing-page.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeaderComponent } from './shared/header/header.component';
import { AddBookComponent } from './add-book/add-book.component';

import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    LandingPageComponent,
    HeaderComponent,
    BookListingComponent,
    FooterComponent,
    BookLandingPageComponent,
    PaginationComponent,
    HeaderComponent,
    AddBookComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  // Allow multiple interceptors to be applied
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
