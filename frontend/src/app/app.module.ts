import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './utility/modules/material/material.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { UserSidebarComponent } from './components/user/user-sidebar/user-sidebar.component';
import { LoadQuizComponent } from './components/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './components/user/instructions/instructions.component';
import { StartComponent } from './components/user/start/start.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { AdminDashComponent } from './components/admin/admin-dash/admin-dash.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminhomeComponent } from './components/admin/adminhome/adminhome.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { ViewQuizzesComponent } from './components/admin/view-quizzes/view-quizzes.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionsComponent } from './components/admin/add-questions/add-questions.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { HttpClientModule } from '@angular/common/http';
import { TetrisboardComponent } from './components/games/tetrisboard/tetrisboard.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { QuizSearchPipePipe } from './utility/QuizData/quiz-search-pipe.pipe';
import { HighlightDirectiveDirective } from './utility/QuizData/highlight-directive.directive';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { BounceBallComponent } from './components/games/bounce-ball/bounce-ball.component';
import { ToastrModule } from 'ngx-toastr';
import { QuizCategoryPipePipe } from './utility/QuizData/quiz-category-pipe.pipe';
import { MatchingGameComponent } from './components/games/MatchGame/matching-game/matching-game.component';
import { MyFavouritesComponent } from './components/user/my-favourites/my-favourites.component';
import { GameTwoComponent } from './components/games/MatchGame/game-two/game-two.component';
import { ShufflePipe } from './utility/MatchingGame/shuffle.pipe';
import { GameSecondComponent } from './components/games/MatchGame/game-second/game-second.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    AdminDashComponent,
    ProfileComponent,
    SidebarComponent,
    AdminhomeComponent,
    AddQuizComponent,
    ViewQuizzesComponent,
    UpdateQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionsComponent,
    ViewUsersComponent,
    UserDashboardComponent,
    UserSidebarComponent,
    LoadQuizComponent,
    InstructionsComponent,
    StartComponent,
    TetrisboardComponent,
    LeaderboardComponent,
    QuizSearchPipePipe,
    HighlightDirectiveDirective,
    FooterComponent,
    HomePageComponent,
    UserHomeComponent,
    BounceBallComponent,
    MatchingGameComponent,
    GameTwoComponent,
    ShufflePipe,
    GameSecondComponent,
    QuizCategoryPipePipe,
	MyFavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MaterialModule,

    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),

    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
