import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  baseUrl = 'http://localhost:3000';
  rootUrl = 'http://localhost:3000/';

  constructor(private _http: HttpClient) {}

  // for admin
  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${this.baseUrl}/question/quiz/all/${qid}`);
  }

  // for user
  public getQuestionsOfQuizForTest(qid: any) {
    return this._http.get(`${this.baseUrl}/question/quiz/${qid}`);
  }

  public getAllQuestion() {
    return this._http.get(`${this.baseUrl}/questions`);
  }

  // add question
  public addQustions(question: any) {
    return this._http.post(`${this.baseUrl}/question/`, question);
  }

  // //add question
  // addQuestion(data: any): Observable<any> {
  //   return this._http.post(this.rootUrl + 'questions', data);
  // }

  // delete question
  public deleteQustion(questionId: any) {
    return this._http.delete(`${this.baseUrl}/question/ ${questionId}`);
  }
}
