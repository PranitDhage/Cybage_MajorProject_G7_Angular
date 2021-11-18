import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/utility/services/quiz.service';
import { UsiService } from 'src/app/utility/services/usi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss'],
})
export class LoadQuizComponent implements OnInit {
  quizzes: any;
  favQuizzes: any;
  favQuizzesIdArr: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _userService: UsiService,
    private toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this._quiz.getAllQuiz().subscribe((data: any) => {
        this.quizzes = data.quizzes;
      });
    });

    this._userService.getCurrentUser().subscribe((data: any) => {
      this.favQuizzes = data.user.favouriteQuizzes;

      this.favQuizzesIdArr = this.favQuizzes.map((obj) => obj._id);
     
    });
  }

  addFavourite(id: any) {
    if (this.favQuizzesIdArr.includes(id)) {
      this.toastr.warning('This Quiz already present in favourites');

      this._router.navigate(['/user-dashboard/my-favourites']);
    } else {
      this._userService.addFav(id).subscribe((data) => {
        this.toastr.success('Added to Favourites');
        this.ngOnInit();
      });
    }
  }

  onStart(name, category) {
    sessionStorage['quizname'] = name;
    sessionStorage['quizcat'] = category;
  }
}
