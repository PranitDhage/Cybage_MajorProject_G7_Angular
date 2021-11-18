import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/utility/services/quiz.service';
import { IQuiz } from 'src/app/utility/interfaces/iquiz';
import { IQuestion } from 'src/app/utility/interfaces/iquestion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
})
export class AddQuestionsComponent implements OnInit {
  currentQuiz: IQuiz;
  qId: any;
  options1: '';
  options2: '';
  options3: '';
  options4: '';

  questionData: IQuestion;

  constructor(
    private _route: ActivatedRoute,
    private _quizService: QuizService,
    private _router: Router,
    private toastr: ToastrService
  ) {
    this.questionData = {
      question: '',
      options: [],
      answer: '',
    };
  }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.id;
    console.log(this.qId);
    this._quizService.getQuizById(this.qId).subscribe(
      (data) => {
        this.currentQuiz = data['quiz'];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  formSubmit() {
    this.currentQuiz.questions.push(this.questionData);
    this._quizService.updateQuiz(this.qId, this.currentQuiz).subscribe(
      (data: any) => {
        this.toastr.success('Question added');
        this._router.navigate([`/admin-dash/view-questions/${this.qId}`]);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
