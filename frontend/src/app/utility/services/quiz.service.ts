import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IQuiz } from '../interfaces/iquiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseUrl = 'http://localhost:3000/api/v1';
  constructor(private _http: HttpClient, private toastr: ToastrService) {}

  /*
  Nrj =====            Quiz CRUD Observable
  ===================================================================
  */

  //http options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  //get all quiz  /api/v1/quizzes
  getAllQuiz(): Observable<IQuiz> {
    return this._http
      .get<IQuiz>(this.baseUrl + `/quizzes`, {
        withCredentials: true,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  //get quiz by id  /api/v/quiz/:id
  getQuizById(id): Observable<IQuiz> {
    return this._http
      .get<IQuiz>(this.baseUrl + `/quiz/${id}`, {
        withCredentials: true,
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  //create quiz   /api/v1/quiz
  createQuiz(quiz): Observable<IQuiz> {
    return this._http
      .post<IQuiz>(
        this.baseUrl + `/admin/quiz`,
        JSON.stringify(quiz),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //update quiz /api/v1/quiz/:id
  updateQuiz(id, quiz): Observable<IQuiz> {
    return this._http
      .put<IQuiz>(
        this.baseUrl + `/admin/quiz/${id}`,
        JSON.stringify(quiz),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //delete quiz /api/v/quiz/id
  deleteQuiz(id) {
    return this._http
      .delete<IQuiz>(
        this.baseUrl + `/admin/quiz/${id}`,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  //Error Handling
  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.errror.message;
    } else {
      errorMessage = `Error Code : ${error.message}\nMessage:${error.message}`;
    }
    this.toastr.error(errorMessage);
    return throwError(errorMessage);
  }
}
