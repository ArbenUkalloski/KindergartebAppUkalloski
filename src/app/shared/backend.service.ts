import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StoreService } from './store.service';
import { CHILDREN_PER_PAGE } from './constants';
import { Child, ChildResponse } from './interfaces/Child';
import { Kindergarden } from './interfaces/Kindergarden';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens(): void {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getChildren(page: number): Observable<ChildResponse[]> {
    return this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}`)
      .pipe(
        map(data => {
        
          return data;
        })
      );
  }

  public addChildData(child: Child, page: number): void {
    this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
      this.getChildren(page).subscribe(data => {
        this.storeService.children = data;
      });
    });
  }

  public deleteChildData(childId: string, page: number): void {
    this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_ => {
      this.getChildren(page).subscribe(data => {
        this.storeService.children = data;
      });
    });
  }
}
