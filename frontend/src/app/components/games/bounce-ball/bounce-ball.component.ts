import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import { LeaderboardService } from 'src/app/utility/services/leaderboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bounce-ball',
  templateUrl: './bounce-ball.component.html',
  styleUrls: ['./bounce-ball.component.scss'],
})
export class BounceBallComponent implements OnInit, OnDestroy {
  score: number;
  canvas: any;
  sw = 2;
  c = [];
  strokeColor = 0;
  username: string;

  constructor(
    private _leaderboard: LeaderboardService,
    private toastr: ToastrService,
    private router:Router
  ) {}
  ngOnDestroy(): void {
    this.addScoreToDatabase();
  }
  ngOnInit(): void {
    this._leaderboard;
    this.toastr;
    this.username = JSON.parse(
      sessionStorage.getItem('currentLoggedUser')
    ).username;
    // this sketch was modified from the original
    // https://editor.p5js.org/Janglee123/sketches/HJ2RnrQzN
    const sketch = (s) => {
      function Ball() {
        this.r = 15;
        this.x = s.width / 10;
        this.y = s.height - 30;

        var yspeed = 6;
        var xspeed = 0;
        var gravity = 0.2;
        var friction = 0.85;
        this.dw = 0;

        this.yspeed = function () {
          return yspeed;
        };

        this.xspeed = function () {
          return xspeed;
        };

        this.bounceUp = function (y) {
          yspeed -= gravity;
          var d = 0;
          if (s.keyIsDown('W'.charCodeAt(0)) || s.mouseIsPressed) {
            if (d == 0) yspeed = -9;
          }
          d = 1;
          const coef = 0.7;
          if (this.y - this.r + yspeed < y) {
            yspeed *= -coef;
            xspeed *= friction;
            d = 0;
          }

          this.y += yspeed;
          this.x += xspeed;
        };

        this.bounceLat = function () {
          var coef = 1;
          xspeed *= -coef;
          this.x += xspeed;
        };

        this.bounceDown = function (y) {
          yspeed -= gravity;

          const coef = 0.7;
          if (this.y + this.r + yspeed > y) {
            yspeed *= -coef;
            xspeed *= friction;
          }

          this.y += yspeed;
          this.x += xspeed;
        };

        this.bounceCorner = function (xdif, ydif) {
          const angle = get_angle(xdif, ydif);
          const cosa = Math.cos(angle);
          const sina = Math.sin(angle);

          //get the y and x speeds in the newly defined inclined plane
          const v1 = xspeed * cosa - yspeed * sina; //the OX axis in the inclined plane defined by the angle
          const v2 = xspeed * sina + yspeed * cosa; //the OY axis in the inclined plane defined by the angle
          //get the resulting speeds in the original (normal) plane
          xspeed = v1 * cosa - v2 * sina;
          yspeed = v2 * cosa + v1 * sina;

          const coef = 0.9;
          xspeed *= coef;
          yspeed *= coef;
          this.y += yspeed;
          this.x += xspeed;
        };
        this.move = function () {
          yspeed -= gravity;

          if (s.keyIsDown('W'.charCodeAt(0)) || s.mouseIsPressed) {
            if (this.dw == 0) yspeed = 8;
          }
          this.dw = 1;

          if (s.keyIsDown('D'.charCodeAt(0))) {
            xspeed += 1;
            if (xspeed > 3) xspeed = 3;
          }

          if (s.keyIsDown('A'.charCodeAt(0))) {
            xspeed -= 1;
            if (xspeed < -3) xspeed = -3;
          }

          var coef = 0.6;
          if (
            this.x - this.r + xspeed < 0 ||
            this.x + this.r + xspeed > s.width
          )
            xspeed *= -coef;

          coef = 0.7;

          if (this.y - this.r + yspeed < 0) this.dw = 0;

          if (this.dw == 0) {
            yspeed *= -coef;
            xspeed *= friction;
          }

          if (this.y + this.r + yspeed > s.height) {
            yspeed = 0;
            this.y = s.height - this.r;
          }

          this.y += yspeed;
          this.x += xspeed;
        };

        this.show = function () {
          s.fill(176, 243, 241); //orange
          s.ellipse(this.x, s.height - this.y, 2 * this.r, 2 * this.r);
        };
      }

      function Block(x, y, wid, hei) {
        this.x = x;
        this.y = y;
        this.wid = wid;
        this.hei = hei;

        this.scored = false;

        var xspeed = 3;
        var yspeed = 5;
        this.move = function () {
          this.x -= xspeed;
        };

        this.moveV = function (
          y,
          yF // the area of movement
        ) {
          if (this.y + yspeed < y || this.y + yspeed > yF) {
            yspeed *= -1;
          }
          this.y += yspeed;
        };

        this.show = function (a, b, c) {
          if (typeof a !== 'undefined') s.fill(a, b, c);
          else s.fill(23, 145, 23); //light green
          s.rect(this.x, s.height - this.y, this.wid, -this.hei);
        };

        this.checkcollision = function () {
          return rect_coll(this.x, this.y, this.wid, this.hei);
        };
      }

      function show_dest() {
        s.fill(255);
        s.textSize(15);
        s.text('Target area', 850, 500);
      }

      function showMessage(text) {
        s.fill(255, 255, 255);
        s.textSize(30);
        s.text(text, 250, 250);
      }

      var ball;

      function rect_coll(x, y, wid, hei) {
        //if crossed horizontal wall
        if (ball.x + ball.xspeed() > x && ball.x + ball.xspeed() < x + wid)
          if (
            ball.y + ball.yspeed() + ball.r > Math.max(y, y + hei) &&
            ball.y + ball.yspeed() - ball.r < Math.max(y, y + hei)
          ) {
            ball.bounceUp(y + hei);
            return true;
          } else if (
            ball.y + ball.yspeed() + ball.r > Math.min(y, y + hei) &&
            ball.y + ball.yspeed() - ball.r < Math.min(y, y + hei)
          ) {
            ball.bounceDown(y);
            return true;
          }

        //if crossed vertical wall
        if (
          ball.y + ball.yspeed() > Math.min(y, y + hei) &&
          ball.y + ball.yspeed() < Math.max(y, y + hei)
        )
          if (
            ball.x + ball.xspeed() + ball.r >= x &&
            ball.x + ball.xspeed() - ball.r <= x
          ) {
            ball.bounceLat();
            return true;
          } else if (
            ball.x + ball.xspeed() + ball.r >= x + wid &&
            ball.x + ball.xspeed() - ball.r <= x + wid
          ) {
            ball.bounceLat();
            return true;
          }

        //if bumbed against a corner
        if (
          check_dist(
            ball.x - x + ball.xspeed(),
            ball.y - y + ball.yspeed(),
            ball.r
          )
        ) {
          ball.bounceCorner(
            ball.x - x + ball.xspeed(),
            ball.y - y + ball.yspeed()
          );
          return true;
        }
        if (
          check_dist(
            ball.x - x - wid + ball.xspeed(),
            ball.y - y + ball.yspeed(),
            ball.r
          )
        ) {
          ball.bounceCorner(
            ball.x - x - wid + ball.xspeed(),
            ball.y - y + ball.yspeed()
          );
          return true;
        }
        if (
          check_dist(
            ball.x - x + ball.xspeed(),
            ball.y - y - hei + ball.yspeed(),
            ball.r
          )
        ) {
          ball.bounceCorner(
            ball.x - x + ball.xspeed(),
            ball.y - y - hei + ball.yspeed()
          );
          return true;
        }
        if (
          check_dist(
            ball.x - x - wid + ball.xspeed(),
            ball.y - y - hei + ball.yspeed(),
            ball.r
          )
        ) {
          ball.bounceCorner(
            ball.x - x - wid + ball.xspeed(),
            ball.y - y - hei + ball.yspeed()
          );
          return true;
        }

        //wheeee!
        return false;
      }

      function check_dist(a, b, c) {
        if (a * a + b * b <= c * c) return true;
        return false;
      }

      function get_angle(x, y) {
        return Math.atan2(y, x);
      }

      var lost, won;
      var blocks, obstacles, movObst, movObsTwo;
      var timerValue;
      var idSetInterval;
      var minutes, seconds, miliseconds;

      s.setup = () => {
        let canvasForPlay = s.createCanvas(960, 540);
        canvasForPlay.parent('sketch-holder');
        s.fill(255);
        s.noStroke();
        Initialise();
      };

      function timeIt() {
        timerValue += 1;
      }

      function Initialise() {
        blocks = [];
        obstacles = [];
        movObst = [];
        lost = false;
        won = false;

        timerValue = 0;
        idSetInterval = setInterval(timeIt, 10);

        ball = new Ball();
        blocks.push(new Block(0, 270, 100, 30));
        blocks.push(new Block(200, 290, 100, 30));
        blocks.push(new Block(400, 320, 100, 30));
        blocks.push(new Block(640, 380, 100, 30));
        blocks.push(new Block(250, 135, 300, 30));
        blocks.push(new Block(0, 50, 150, 20));
        blocks.push(new Block(730, 0, 30, 130));

        blocks.push(new Block(820, 0, 25, 110));
        blocks.push(new Block(930, 0, 25, 110));
        blocks.push(new Block(845, 0, 85, 20));

        obstacles.push(new Block(300, 290, 200, 20));
        obstacles.push(new Block(400, 300, 100, 20));
        obstacles.push(new Block(500, 320, 100, 20));
        obstacles.push(new Block(600, 340, 100, 20));
        obstacles.push(new Block(640, 360, 100, 20));
        obstacles.push(new Block(550, 110, 30, 30));
        obstacles.push(new Block(0, 0, 730, 30));
        obstacles.push(new Block(760, 0, 60, 30));

        movObst.push(new Block(860, 400, 15, 90));
        movObst.push(new Block(780, 400, 15, 90));
        movObsTwo = new Block(670, 50, 15, 90);
      }

      s.draw = () => {
        s.background(0); //blue

        // Timer display start
        minutes = Math.floor(timerValue / 3600)
          .toString()
          .padStart(2, '0');
        seconds = Math.floor((timerValue % 3600) / 60)
          .toString()
          .padStart(2, '0');
        miliseconds = (timerValue % 60).toString().padStart(2, '0');
        s.text(minutes + ':' + seconds + ':' + miliseconds, 10, 25);

        if (!lost && !won) {
          ball.move();
        }

        ball.show();
        for (let i = 0; i < blocks.length; i++) {
          blocks[i].show();
          if (blocks[i].checkcollision()) {
            if (i == blocks.length - 1) {
              won = true;
            }
          }
        }
        for (let i = 0; i < obstacles.length; i++) {
          obstacles[i].show(200, 0, 0);
          if (obstacles[i].checkcollision()) {
            lost = true;
          }
        }
        for (let i = 0; i < movObst.length; i++) {
          movObst[i].show(200, 10, 10);
          movObst[i].moveV(200, 400);
          if (movObst[i].checkcollision()) {
            lost = true;
          }
        }

        movObsTwo.show(200, 10, 10);
        movObsTwo.moveV(50, 250);
        if (movObsTwo.checkcollision()) {
          lost = true;
        }

        if (won) {
          clearTimeout(idSetInterval);
          this.score = 216000 - Number(timerValue);
          showMessage("Congratulations, you've won! Press R to restart");

        }

        if (lost) {
          clearTimeout(idSetInterval);
          this.score = 0;
          showMessage('GAME OVER! Press R to restart');
        }

        show_dest();

        if ((lost || won) && s.keyIsDown('R'.charCodeAt(0))) Initialise();
      };
    };

    this.canvas = new p5(sketch);
  }
  addScoreToDatabase() {
    this._leaderboard
      .addNewScore(this.username, 'Bounce Ball', 'Games', this.score)
      .subscribe((res: any) => {
        if (res['success']) {
          this.toastr.success('Score Submitted');
        }
      });
  }
}
