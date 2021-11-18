import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionsComponent } from './components/admin/add-questions/add-questions.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { AdminDashComponent } from './components/admin/admin-dash/admin-dash.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './components/admin/view-quizzes/view-quizzes.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { BounceBallComponent } from './components/games/bounce-ball/bounce-ball.component';
import { TetrisboardComponent } from './components/games/tetrisboard/tetrisboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { InstructionsComponent } from './components/user/instructions/instructions.component';
import { LoadQuizComponent } from './components/user/load-quiz/load-quiz.component';
import { StartComponent } from './components/user/start/start.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { MyFavouritesComponent } from './components/user/my-favourites/my-favourites.component';
import { AdminGuardService } from './utility/services/admin-guard.service';
import { UserGuardService } from './utility/services/user-guard.service';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },

  {
    path: 'admin-dash',
    component: AdminDashComponent,
    canActivate: [AdminGuardService],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: '',
        component: AdminhomeComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'view-quizzes',
        component: ViewQuizzesComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'add-quizzes',
        component: AddQuizComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'quiz/:id',
        component: UpdateQuizComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'view-questions/:id',
        component: ViewQuizQuestionsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'add-questions/:id',
        component: AddQuestionsComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'view-users',
        component: ViewUsersComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        canActivate: [AdminGuardService],
      },
      {
        path: 'games',
        component: TetrisboardComponent,
        canActivate: [AdminGuardService],
      },
    ],
  },

  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuardService],
    children: [
      {
        path: '',
        component: UserHomeComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'quizzes',
        component: LoadQuizComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'view-quizzes',
        component: ViewQuizzesComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'instructions/:id',
        component: InstructionsComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'tetris',
        component: TetrisboardComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'bounce-ball',
        component: BounceBallComponent,
        canActivate: [UserGuardService],
      },
      {
        path: 'my-favourites',
        component: MyFavouritesComponent,
        canActivate: [UserGuardService],
      },
    ],
  },

  {
    path: 'start/:id',
    component: StartComponent,
    canActivate: [UserGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
