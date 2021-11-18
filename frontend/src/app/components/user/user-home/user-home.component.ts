import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToQuizzes() {
    this.router.navigate(['/user-dashboard/quizzes']);
  }

  goToLeaderBoard() {
    this.router.navigate(['/user-dashboard/leaderboard']);
  }

  goToTetris() {
    this.router.navigate(['/user-dashboard/tetris']);
  }

  goToBounceBall() {
    this.router.navigate(['/user-dashboard/bounce-ball']);
  }
}
