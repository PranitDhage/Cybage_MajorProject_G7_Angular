import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from 'src/app/utility/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  topScorer: any = [];
  username: any = '';
  constructor(private _leaberboardService: LeaderboardService) {}

  ngOnInit(): void {
    this.getTopScorer();
  }
  getTopScorer() {
    this._leaberboardService.getTopScorer().subscribe((res: any) => {
      if (res['success']) {
        this.topScorer = res['topScorer'];
        console.log(this.topScorer);
      } else {
        console.log(res);
      }
    });
  }
}
