import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements AfterViewInit{
  @Input() currentPage: number = 1;
  @Input() itemsPerPage:number = 10;
  paginationConfig: any;
  totalItems: number = 0;
  itemsPerPageArray = [10, 20, 50, 100];
  isPrevDisabled = false;
  isNextDisabled = false;

  constructor(private utilService: UtilService){}

  ngOnInit(): void{
    this.currentPage = 1;
    this.utilService.paginationConfigSubject
      .subscribe((res: any) => {
        this.paginationConfig = res;
        this.isPrevDisabled = this.paginationConfig?.prev ? false : true;
        this.isNextDisabled = this.paginationConfig?.next ? false : true;
      });
  }

  ngAfterViewInit(): void {
      
      
  }

  onClickPrev(): void{
    if(this.currentPage > 1){
      this.currentPage = this.currentPage - 1;
      this.submitPaginationInfo();
    }
  }

  onClickNext(): void{
      this.currentPage = this.currentPage + 1;
      this.submitPaginationInfo();
  }

  onPageChange(event: any): void{
    this.currentPage = 1;
    this.submitPaginationInfo();
  }

  submitPaginationInfo(): void {
    let obj = {
      page: this.currentPage,
      limit: this.itemsPerPage
    }
    this.utilService.paginationSubject.next(obj);
  }

}