import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public paginationSubject: Subject<any> = new Subject<any>();
  public paginationConfigSubject: Subject<any> = new Subject<any>();
  public refreshBooksListSubject: Subject<any> = new Subject<any>();
  constructor() { }

}
