import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthApis, BookApis } from '../constants/api.constants';
import { AuthServiceService } from '../auth/services/auth-service.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-book-landing-page',
  templateUrl: './book-landing-page.component.html',
  styleUrls: ['./book-landing-page.component.scss']
})
export class BookLandingPageComponent {
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

  constructor(private apiService: ApiService, private authService: AuthServiceService, private utilService: UtilService) {
    this.bookSearchSubject
      .pipe(
        debounceTime(300), // Wait 300ms after the last keystroke
        distinctUntilChanged() // Avoid duplicate consecutive values
      )
      .subscribe((searchTerm) => {
        this.filterBooks(searchTerm);
      });
      this.getPaginationUpdates();
  }

  

  ngOnInit(): void{
    this.currentUser = this.authService.getUser();
    this.getBooksList();
  }

  getBooksList(): void {
    this.apiService.get(BookApis.getBooks(this.limit, this.page, this.bookSearchTerm))
    .subscribe((res: any) => {
      this.booksListCount = res?.count;
      if(res){
        let _books = res?.data;
        this.paginationConfig = res?.pagination;
        this.utilService.paginationConfigSubject.next(res?.pagination);
        this.booksList = _books.map((res: any) => {
          return{
            ...res,
            "allowEditOrDelete": this.allowEditOrDelete(res.userId)
          }
          
        });
      }
    })
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
