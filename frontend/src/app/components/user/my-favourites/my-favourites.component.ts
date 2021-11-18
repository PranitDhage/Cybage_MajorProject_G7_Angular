import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/utility/services/quiz.service';
import { UsiService } from 'src/app/utility/services/usi.service';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.scss']
})
export class MyFavouritesComponent implements OnInit {

  favQuizzes : any[];

  constructor(
    private _userService: UsiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._userService.getCurrentUser().subscribe(
      (data: any) => {
        this.favQuizzes = data.user.favouriteQuizzes;
      }
    );
  }

  removeFavourite(id: any) {
    this._userService.removeFav(id).subscribe(
      (data) => {
        this.toastr.success('Deleted from Favourites');
        this.ngOnInit();
      },
      (error) => {
        this.toastr.error('something went wrong');
      }
    );
  }

}
