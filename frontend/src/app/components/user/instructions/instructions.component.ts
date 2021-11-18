import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/utility/services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit {
  quizId: any;
  quiz: any;
  numberOfQuestions : any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    // private _snackBar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params.id;
    console.log(this.quizId);
    

    this._quiz.getQuizById(this.quizId).subscribe(
      (data: any) => {
        // console.log(data);
        this.quiz = data.quiz;
        console.log(this.quiz);
        this.numberOfQuestions = this.quiz.questions.length;
        console.log(this.quiz.questions);
        console.log(this.numberOfQuestions);
        
      },
      (error) => {
        // this._snackBar.open('Error in loading all quizzes from server!', '', {
        //   duration: 3000,
        // });
        console.log('error');
        
      }
    );

    // console.log(this.quiz.questions);
    

    // this.numberOfQuestions = this.quiz.questions.length;

    // console.log(this.numberOfQuestions);
    
  }

  startQuiz() {
    // Swal.fire({
    //   title: 'Do you want to Start the Quiz?',
    //   // showDenyButton: true,
    //   showCancelButton: true,
    //   confirmButtonText: 'Start',
    //   // denyButtonText: `Don't start`,
    //   icon: 'info',
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     this._router.navigate(['/start/' + this.quizId]);
    //   } else if (result.isDenied) {
    //     Swal.fire('Try Again', '', 'info');
    //   }
    // });

    this._router.navigate(['/start/' + this.quizId]);
  }
  
}
