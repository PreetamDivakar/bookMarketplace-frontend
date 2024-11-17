import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
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
  @Input() currentPage: any;

  

  constructor(private apiService: ApiService, private notificationService: ToastrService, private router: Router, private utilService: UtilService){}

  ngOnInit() {
    this.utilService.paginationSubject
      .subscribe((res: any) => {
        this.itemsPerPage = res?.limit;
      });
  }

  ngOnChanges(changes: any): void{
    if(changes?.booksList){
      this.booksList = [...changes?.booksList?.currentValue];
    }

  }

  onEditBook(book: any): void{
    this.router.navigate([`edit-book/${book?._id}`])
  }

  getBookDetails(book: any): void{
    this.router.navigate([`book-details/${book?._id}`])
  }

  onDeleteBook(book: any): void{
    this.apiService.put(BookApis.removeBook(book?._id), {})
    .subscribe((res: any) => {
      if(res?.success){
        this.notificationService.success('Book Removed Successfully', 'Success');
      }
      else{
        this.notificationService.error('Some problem encountered', 'Error');
      }
    });
  }

  requestBook(book: any){
    this.notificationService.success('Book Requested Successfully', 'Success');
  }
}