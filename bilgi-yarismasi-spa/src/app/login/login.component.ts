  import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';
 
@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private quizService:QuizService,private route: Router,private signalRService:SignalRService) { } 
  userid: any;
  ngOnInit() {
    this.signalRService.startConnection(); 
  }
  OnSubmit(name:string, surname:string){
    this.quizService.insertUser(name,surname,this.signalRService.connectId).subscribe(
      (data :any) =>{
        var fname = name.concat( " " );
        fname=fname.concat(surname);
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(fname));
        localStorage.setItem('userid', JSON.stringify(this.signalRService.connectId));//current userin idsi eklendi
        this.route.navigate(['/wait']);//bunu daha sonra wait kısmına yönlendir waiti quiz kısmına yönlendir
      }
    );
  }
}
 



