import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  constructor(public storeService: StoreService, private backendService: BackendService) {}

  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  public isNameSortedAscending: boolean = true;
  public isBirthdateSortedAscending: boolean = true;

  ngOnInit(): void {
    this.loadChildren();
  }

  private async loadChildren(): Promise<void> {
    this.isLoading = true;
    try {
      const response = await this.backendService.getChildren(this.currentPage);
      if (response instanceof HttpResponse) {
        this.handleChildrenResponse(response);
      }
    } catch (error) {
      this.handleError(error, 'Error loading children');
    } finally {
      this.isLoading = false;
    }
  }

  private handleChildrenResponse(response: HttpResponse<any>): void {
    const data = response.body || [];
    const totalCount = response.headers.get('X-Total-Count') || '0';
    this.storeService.children = data;
    this.storeService.childrenTotalCount = Number(totalCount);
    this.updateDataSource();
    this.sortByName();
  }

  private handleError(error: any, message: string): void {
    console.error(`${message}:`, error);
  }

  private updateDataSource(): void {
    this.dataSource = new MatTableDataSource<any>(this.storeService.children);
    this.dataSource.paginator = this.paginator;
  }

  getAge(birthDate: string): number {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate);
    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    const m = today.getMonth() - birthDateTimestamp.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
      age--;
    }
    return age;
  }

  selectPage(i: number): void {
    this.isLoading = true;
    this.selectPageEvent.emit(i);
    this.loadChildren();
  }

  returnAllPages(): number[] {
    const pageCount = Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  async cancelRegistration(childId: string): Promise<void> {
    this.isLoading = true;
    try {
      await this.backendService.deleteChildData(childId, this.currentPage);
      this.loadChildren();
    } catch (error) {
      this.handleError(error, 'Error canceling registration');
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(event: any): void {
    const filterValue = (event?.target as HTMLInputElement)?.value.trim().toLowerCase();
    this.dataSource.filter = filterValue || '';
  }

  sortByName(): void {
    this.isNameSortedAscending = !this.isNameSortedAscending;
    this.sortChildren('name', this.isNameSortedAscending);
  }

  sortByBirthdate(): void {
    this.isBirthdateSortedAscending = !this.isBirthdateSortedAscending;
    this.sortChildren('birthDate', this.isBirthdateSortedAscending);
  }

  private sortChildren(property: string, ascending: boolean): void {
    this.storeService.children.sort((a, b) => {
      const valueA = property === 'name' ? a.name.toLowerCase() : new Date(a.birthDate);
      const valueB = property === 'name' ? b.name.toLowerCase() : new Date(b.birthDate);

      let result: number;
      if (valueA < valueB) {
        result = ascending ? -1 : 1;
      } else if (valueA > valueB) {
        result = ascending ? 1 : -1;
      } else {
        result = 0;
      }

      return result;
    });

    this.updateDataSource();
  }
}
