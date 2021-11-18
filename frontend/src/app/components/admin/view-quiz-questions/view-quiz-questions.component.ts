import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IQuiz } from 'src/app/utility/interfaces/iquiz';
import { QuestionService } from 'src/app/utility/services/question.service';
import { QuizService } from 'src/app/utility/services/quiz.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.scss'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  currentQuiz: IQuiz;
  qId: any;
  qTitle: any;
  questions: any = [];
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quizService: QuizService
  ) {}

  ngOnInit(): void {



    this.qId = this._route.snapshot.params.id;
    // this.qTitle = this._route.snapshot.params.title;
    console.log(this.qId);
    // console.log(this.qTitle);

    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data as string[];
        console.log('Quiz id:' + this.qId);
        console.log(data);
        // this.questions=data;
        // JSON.stringify(this.questions);
      },
      (error) => {
        console.log(error);
      }
    );

    this._question.getAllQuestion().subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this._quizService.getQuizById(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.currentQuiz = data.quiz;
        this.questions = data.quiz.questions;
        this.qTitle = data.quiz.name;
      }
    )
  }

  deleteQuestion(id: any){
    console.log(id);
    // let currentId = this.qId;
    
    let index = this.questions.findIndex(function(o){
      return o._id === id;
    })

    if(index !== -1) this.questions.splice(index,1);

    this.currentQuiz.questions = this.questions;
    
console.log(this.currentQuiz.questions);

    this._quizService.updateQuiz(this.qId, this.currentQuiz).subscribe(
      (data: any) =>{
        console.log(data);
        
        console.log("deleted");
      },
      (error: any)=>{
        console.log(error);
      }
    )
  }

  
}
