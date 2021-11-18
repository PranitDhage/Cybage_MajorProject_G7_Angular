import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/utility/services/quiz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss'],
})
export class ViewQuizzesComponent implements OnInit {
  searchTextName: string = '';
  searchTextCategory: string = '';

  quizzes: any = [];

  constructor(private _quiz: QuizService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this._quiz.getAllQuiz().subscribe(
      (data: any) => {
        this.quizzes = data.quizzes;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuiz(id: any) {
    this._quiz.deleteQuiz(id).subscribe(
      (data) => {
        this.toastr.success('Deleted');
        this.ngOnInit();
      },
      (error) => {
        this.toastr.error('something went wrong');
      }
    );
  }

  categoryFilter(category: string) {
    this.searchTextCategory = category;
  }
}
