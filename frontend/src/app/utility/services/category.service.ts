import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:3000';
  rootUrl = 'http://localhost:3000/';

  constructor(private _http: HttpClient) {}

  //load all the categories
  public categories() {
    return this._http.get(`${this.baseUrl}/categories`);
  }

  //add new category
  addCategory(data: any): Observable<any> {
    return this._http.post(this.rootUrl + 'categories', data);
  }
}
