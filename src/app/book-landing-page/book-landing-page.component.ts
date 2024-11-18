import { AfterViewInit, Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthApis, BookApis } from '../constants/api.constants';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { UtilService } from '../services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-landing-page',
  templateUrl: './book-landing-page.component.html',
  styleUrls: ['./book-landing-page.component.scss']
})
export class BookLandingPageComponent implements AfterViewInit{
  private bookSearchSubject: Subject<string> = new Subject<string>();
  currentUser: any;
  limit = 10;
  page = 1;
  bookSearchTerm = '';
  paginationConfig: any;
  booksListCount: number = 0;
  booksList = [
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    },
    {
      id: '001',
      title: 'Demo',
      description: 'Welcome to the demo book',
      author: 'Demo123',
      genre: 'Comedy',
      condition: 'good',
      availabilityStatus: true

    }
  ]

  constructor(private apiService: ApiService, private authService: AuthServiceService, private utilService: UtilService, private notificationService: ToastrService) {
    this.bookSearchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last keystroke
        distinctUntilChanged() // Avoid duplicate consecutive values
      )
      .subscribe((searchTerm) => {
        this.filterBooks(searchTerm);
      });
      this.getPaginationUpdates();
      this.updateBooksList();
  }

  ngOnInit(): void{
    this.currentUser = this.authService.getUser();
  }
  
  ngAfterViewInit(): void{
    this.getBooksList();
  }

  getBooksList(): void {
    this.apiService.get(BookApis.getBooks(this.limit, this.page, this.bookSearchTerm))
    .subscribe((res: any) => {
      this.booksListCount = res?.count;
      if(res){
        let _books = res?.data;
        this.page = res?.currentPage;
        this.paginationConfig = {totalBooks: res?.totalBooks, totalPages: res?.totalPages, currentPage: res?.currentPage};
        this.utilService.paginationConfigSubject.next({totalBooks: res?.totalBooks, totalPages: res?.totalPages, currentPage: res?.currentPage});
        this.booksList = _books.map((res: any) => {
          return{
            ...res,
            "allowEditOrDelete": this.allowEditOrDelete(res.userId)
          }
          
        });
      }
    })
  }

  async onDeleteBook(book: any) {
    await this.apiService.put(BookApis.removeBook(book?._id), {})
      .subscribe((res: any) => {
        if (res?.success) {
          this.notificationService.success('Book Removed Successfully', 'Success');
          this.page = 1;
          this.limit = 10;
          this.utilService.paginationSubject.next({page: this.page, limit: this.limit});
          this.getBooksList();
        }
        else {
          this.notificationService.error('Some problem encountered', 'Error');
        }
      });
  }

  allowEditOrDelete(id: any): boolean{
    return this.currentUser?._id === id;
  }

  getPaginationUpdates(): void{
    this.utilService.paginationSubject
    .subscribe((res: any) => {
      if(res){
        this.limit = parseInt(res?.limit) || 10;
        this.page = res?.page || 1;
        this.getBooksList();
      }
    })
  }

  updateBooksList(): void{
    this.utilService.refreshBooksListSubject.subscribe(
      (res: any) => {
        if(res?.data){
          this.getBooksList();
        }
      }
    )
  }

  onSearchBook(): void {
    this.bookSearchSubject.next(this.bookSearchTerm);
  }

  filterBooks(searchTerm: string): void{
    const _searchTerm = searchTerm.toLowerCase().trim();
    this.getBooksList();
  }

  clearResults(): void{
    this.bookSearchTerm = '';
    this.bookSearchSubject.next('');
  }
}
