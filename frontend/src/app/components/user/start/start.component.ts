import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaderboardService } from 'src/app/utility/services/leaderboard.service';
import { QuestionService } from 'src/app/utility/services/question.service';
import { QuizService } from 'src/app/utility/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  quizId: any;
  questions: any;
  quizcat:any;
  totalScore: any;

  topScore: number = 0;
  // username: any = sessionStorage['currentLoggedUser'].username;
  username: any;
  quizname: any;
  correctAnswers: number = 0;
  attempted: number = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quizService: QuizService,
    private _leaderboardService: LeaderboardService
  ) {}

  ngOnInit(): void {
    // this.quizname = this._route.snapshot.params.quizname;
    this.preventBackButton();
    this.quizId = this._route.snapshot.params.id;
    this.quizcat = sessionStorage['quizcat']
    this.loadQuestions();
    this.startTime()

    this.username = JSON.parse(sessionStorage.getItem("currentLoggedUser")).username;

    window.addEventListener("keyup", disableF5);
    window.addEventListener("keydown", disableF5);

    function disableF5(e){
      if ((e.which || e.keyCode) ==116) e.preventDefault();
    }

    // @HostListener('contextmenu', ['$event']);

  
    
  }

  loadQuestions() {
    this._quizService.getQuizById(this.quizId).subscribe(
      (data: any) => {
        this.questions = data.quiz.questions;
        this.quizname = data.quiz.name;
        this.totalScore = data.quiz.totalScore

        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
        });
        // this.quizname = questions[0].quiz.title
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions of quiz!', 'error');
      }
    );
  }

  // preventBackButton() {
  //   history.pushState(null, null, location.href);
  //   this.locationSt.onPopState(() => {
  //     history.pushState(null, null, location.href);
  //   });
  // }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the Quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      // denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        // calculation
        this.isSubmit = true;
        this.evalQuiz();
        this.addScore();
        // console.log('Correct Answers: ' + this.correctAnswers);
        // console.log('Marks Got: ' + this.topScore);
        // console.log('Attempted: ' + this.attempted);
        // console.log(this.questions);
      }
    });
  }

  evalQuiz() {
    this.questions.forEach((q: any) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        let marksSingle =
          this.totalScore / this.questions.length;

        // this.topScore = parseFloat(Number(this.topScore).toFixed(2));
        this.topScore += marksSingle;
      }

      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });
  }

  addScore() {
    this._leaderboardService
      .addNewScore(this.username, this.quizname,this.quizcat, this.topScore)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  startTime() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let sc = this.timer - mm * 60;
    return `${mm} min : ${sc} sec`;
  }

  printPage() {
    window.print();
  }

  toString1(i: number) {
    return i + '';
  }
}

// npm install disable-browser-back-navigation --save
// import disableBrowserBackButton from 'disable-browser-back-navigation';
// disableBrowserBackButton();
