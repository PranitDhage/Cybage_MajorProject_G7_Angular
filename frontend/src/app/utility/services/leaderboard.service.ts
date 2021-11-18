import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  url = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  //http options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  addNewScore(
    username: string,
    name: string,
    category: string,
    score: number
  ): Observable<any> {
    const body = {
      username: username,
      name: name,
      category: category,
      score: score,
    };
    return this.http.post(
      this.url + '/add-score',
      JSON.stringify(body),
      this.httpOptions
    );
  }

  getTopScorer(): Observable<any> {
    return this.http.get(this.url + '/top-scorer', { withCredentials: true });
  }
}
