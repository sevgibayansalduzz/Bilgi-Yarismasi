import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'; //backend ile bağlantı için
import{RouterModule} from '@angular/router';   //sayfalar arası geçiş belirlemek için
import{FormsModule} from '@angular/forms';    //formlar için


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';
import { appRoutes } from './routes';
import { WaitComponent } from './wait/wait.component';
import { QuizService } from './shared/quiz.service';
import { AuthenticationGuard } from './Guard/authentication/authentication.guard';
import { CurrentUsersComponent } from './current-users/current-users.component';
import { QuizGuardService } from './Guard/QuizGuard/QuizGuard.service'; 

@NgModule({
   declarations: [
      AppComponent,
      QuestionComponent,
      NavbarComponent,
      ResultComponent,
      LoginComponent, 
      WaitComponent,
      CurrentUsersComponent 
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      RouterModule.forRoot(appRoutes),
      FormsModule,
      HttpClientModule
   ],
   providers: [
      QuizService,
      AuthenticationGuard,
      QuizGuardService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
