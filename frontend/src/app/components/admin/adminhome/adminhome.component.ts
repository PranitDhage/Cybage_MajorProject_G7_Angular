import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss'],
})
export class AdminhomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goToUsers() {
    this.router.navigate(['/admin-dash/view-users']);
  }
  goToCategories() {
    this.router.navigate(['/admin-dash/categories']);
  }
  goToQuizzes() {
    this.router.navigate(['/admin-dash/view-quizzes']);
  }
  goToGames() {
    this.router.navigate(['/admin-dash/games']);
  }

  goToLeaderBoard() {
    this.router.navigate(['/admin-dash/leaderboard']);
  }
}
