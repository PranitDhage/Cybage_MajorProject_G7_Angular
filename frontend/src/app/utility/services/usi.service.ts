import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsiService {
  rootUrl = 'http://localhost:3000/api/v1';


  constructor(private _http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'withCredentials' : true
  }

  registerUser(data: any): Observable<any> {
    return this._http.post(this.rootUrl + '/signup', JSON.stringify(data), this.httpOptions);
  }

  loginUser(data: any): Observable<any> {
    return this._http.post(this.rootUrl + '/login', JSON.stringify(data), this.httpOptions);
  }

  getCurrentUser(): Observable<any> {
    return this._http.get(this.rootUrl + '/me', {withCredentials: true});
  }

  getUserById(id: any): Observable<any>{
    return this._http.get(this.rootUrl + '/admin/user'+ id, {withCredentials: true});
  }

  getAllUser(): Observable<any>{
    return this._http.get(this.rootUrl+ '/admin/users', {withCredentials: true});
  }

  logout(){
    return this._http.get(this.rootUrl + '/logout', {withCredentials: true});
  }


  addFav(id): Observable<any> {
    console.log(id);
    const body = {id: id}
    return this._http
      .put<any>(
        this.rootUrl + `/addFav`,
        JSON.stringify(body),
        this.httpOptions
      )
     
  }

 

  removeFav(id): Observable<any> {
    const body = {id: id}
    return this._http
      .put<any>(
        this.rootUrl + `/removeFav`,
        JSON.stringify(body),
        this.httpOptions
      )
       }
}
