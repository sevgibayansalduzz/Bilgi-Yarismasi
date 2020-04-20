import {Routes} from '@angular/router'
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { WaitComponent } from './wait/wait.component';
import { AuthenticationGuard } from './Guard/authentication/authentication.guard';
import { QuizGuardService } from './Guard/QuizGuard/QuizGuard.service';

 
export const appRoutes : Routes =[
    {path:'login',component:LoginComponent},    // login sayfası login componentinde
    {path:'wait',component:WaitComponent,canActivate : [AuthenticationGuard]}, //wait sayfası wait componentinde
    {path:'quiz',component:QuestionComponent,canActivate : [AuthenticationGuard,QuizGuardService] },//quiz sayfası question componentinde
    {path:'result',component:ResultComponent,canActivate : [AuthenticationGuard]}, //result sayfası result componentinde
    {path:'',redirectTo:'/login',pathMatch:'full'}
];
 