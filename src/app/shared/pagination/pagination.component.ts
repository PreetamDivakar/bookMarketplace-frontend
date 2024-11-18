import { AfterViewInit, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  paginationConfig: any;
  totalItems: number = 0;
  itemsPerPageArray = [10, 20, 50, 100];

  constructor(private utilService: UtilService) {
    this.utilService.paginationConfigSubject
      .subscribe((res: any) => {
        this.paginationConfig = res;
        console.log(res)
        this.currentPage = res?.currentPage;
      });
  }

  ngOnChanges(changes: any): void{
    if(changes){
      this.currentPage = changes?.currentPage?.currentValue || 1;
      this.itemsPerPage = changes?.itemsPerPage?.currentValue || 10;
    }
  }

  isPreviousDisabled(): any {
    if (this.currentPage === 1) {
      return true;
    }
    return false;
  }

  isNextDisabled(): any {
    console.log(this.paginationConfig?.totalPages)
    if (this.currentPage === this.paginationConfig?.totalPages) {
      return true;
    }
    return false;
  }

  onClickPrev(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.submitPaginationInfo();
    }
  }

  onClickNext(): void {
    this.currentPage = this.currentPage + 1;
    this.submitPaginationInfo();
  }

  onCurrentPageChange(): void {
    if (this.currentPage <= 0) {
      this.currentPage = 1;
    }
    else if (this.currentPage > this.paginationConfig?.totalPages) {
      this.currentPage = this.paginationConfig?.totalPages;
    }
    this.submitPaginationInfo();
  }

  onPageLimitChange(event: any): void {
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