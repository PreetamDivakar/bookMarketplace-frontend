import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { ApiService } from '../services/api.service';
import { BookApis } from '../constants/api.constants';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent implements OnChanges {

  @Input() booksList: any = [];
  @Input() itemsPerPage: any = 10;
  @Input() currentPage: any = 1;
  @Output() deleteBook = new EventEmitter<any>();

  constructor(private apiService: ApiService, private notificationService: ToastrService, private router: Router, private utilService: UtilService) {
    this.utilService.paginationSubject
    .subscribe((res: any) => {
      this.itemsPerPage = res?.limit;
    })
   }

  ngOnInit() {
  }

  ngOnChanges(changes: any): void {
    if (changes) {
      this.booksList = [...changes?.booksList?.currentValue];
    }

  }

  onEditBook(book: any): void {
    this.router.navigate([`edit-book/${book?._id}`])
  }

  getBookDetails(book: any): void {
    this.router.navigate([`book-details/${book?._id}`])
  }

  onDeleteBook(book: any): void {
    this.deleteBook.emit(book);
  }

  requestBook(book: any) {
    this.notificationService.success('Book Requested Successfully', 'Success');
  }
}