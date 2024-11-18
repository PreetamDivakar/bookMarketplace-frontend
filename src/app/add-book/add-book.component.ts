import { Component } from '@angular/core';
import { LoginConstants } from '../constants/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BookApis } from '../constants/api.constants';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  bookForm: FormGroup;
  requiredFieldsError = false;
  loginCredentials = LoginConstants;
  currentUser: any;
  options: any;
  bookId: any;
  detailsView = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private authService: AuthServiceService, private notificationService: ToastrService, private route: ActivatedRoute, private utilService: UtilService) {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]], // Email validation
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      condition: ['', [Validators.required]], // Password validation
      availabilityStatus: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.getEditBookDetails();
  }

  getEditBookDetails(): void {
    let _url = this.route.snapshot?.routeConfig?.path || '';
    this.detailsView = _url.includes('book-details') || false;
    this.bookId = this.route.snapshot.paramMap.get('id');
    if (this.bookId) {
      this.apiService.get(BookApis.getBook(this.bookId))
        .subscribe((res: any) => {
          if (res?.success) {
            let _book = res?.data;
            this.bookForm.patchValue(_book);
            this.detailsView ? this.bookForm.disable() : this.bookForm.enable();
          }
        })
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      let requestObj = {
        ...this.bookForm.value,
        userId: this.currentUser?._id || ''
      }
      this.bookId ? this.apiService.put(BookApis.updateBook(this.bookId), requestObj)
      .subscribe(
        (res: any) => {
          if (res?.success) {
            this.notificationService.success('Book Updated Successfully', 'Success');
            this.bookForm.reset();
            this.utilService.refreshBooksListSubject.next({data: true});
            this.navigateToHome();
          }
          else {
            this.notificationService.error('Some problem encountered', 'Error');
          }

        }
      ) :
      this.apiService.post(BookApis.createBook, requestObj)
        .subscribe(
          (res: any) => {
            if (res?.success) {
              this.notificationService.success('Book Added Successfully', 'Success');
              this.bookForm.reset();
              this.navigateToHome();
              this.utilService.refreshBooksListSubject.next({data: true})
            }
            else {
              this.notificationService.error('Some problem encountered', 'Error');
            }

          }
        )
      // You can also handle your submission logic here
    }
  }

  validateForm() {
    this.onSubmit();
  }

  checkValidity() {
    return !this.bookForm.valid;
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

}
