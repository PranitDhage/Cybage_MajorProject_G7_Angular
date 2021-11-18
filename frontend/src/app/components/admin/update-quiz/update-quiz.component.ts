import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/utility/services/category.service';
import { QuizService } from 'src/app/utility/services/quiz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  id = 0;
  quiz: any;
  categories: any;
  ngOnInit(): void {
    this.id = this._route.snapshot.params.id;
    this._quiz.getQuizById(this.id).subscribe(
      (data: any) => {
        this.quiz = data.quiz;
      },
      (error) => {
        console.log(error);
      }
    );
    this.categories = [
      'Brain Teasers',
      'Logical Thinking',
      'General Knowledge',
    ];
  }

  public updateSubmit() {
    this._quiz.updateQuiz(this.id, this.quiz).subscribe(
      (data) => {
        this.toastr.success('quiz updated');
        this._router.navigate(['/admin-dash/view-quizzes']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
