import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuiz } from 'src/app/utility/interfaces/iquiz';
import { QuizService } from 'src/app/utility/services/quiz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
export class AddQuizComponent implements OnInit {
  categories = ['Brain Teasers', 'Logical Thinking', 'General Knowledge'];

  quizData: IQuiz;

  constructor(
    private _quiz: QuizService,
    private _router: Router,
    private toastr: ToastrService
  ) {
    this.quizData = {
      name: '',
      category: '',
      totalScore: 0,
      description: '',
      questions: [],
      answer: '',
    };
  }

  ngOnInit(): void {}

  addQuiz() {
    console.log(this.quizData);

    //call server
    this._quiz.createQuiz(this.quizData).subscribe(
      (data) => {
        console.log(this.quizData);
        this.toastr.success('added successfully');

        this._router.navigate(['/admin-dash/view-quizzes']);

        this.quizData = {
          name: '',
          category: '',
          totalScore: 0,
          description: '',
          questions: [{ question: '', options: [''], answer: '' }],
          answer: '',
        };
      },
      (error) => {
        this.toastr.error('Something went wrong');
        window.location.reload();
      }
    );
  }
}
