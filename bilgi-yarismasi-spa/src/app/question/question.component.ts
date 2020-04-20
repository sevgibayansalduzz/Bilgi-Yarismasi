import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Question } from '../models/question';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';
import { User } from '../models/user';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private http:HttpClient,private qService:QuizService,private route: Router,private signalRService: SignalRService) { }
  
  questions:Question[]; /// array of quesitons
  qnumber: number=0;    /// current question number
  clicknum:number=0;   ///current question number of rival
  score: number=0;     /// user score
  csore:number=0;
  //question:Question;   ///current question
  statu:boolean=false;
  competitor:string;
  nav:boolean=false;
  
  ngOnInit() {
    this.qService.getSpecificUser(this.signalRService.connectId).subscribe(data=>{
      this.competitor=data.gameId;
    })
    this.getMessage();
    this.getClickInfo();
    this.qService.getQuestions().subscribe(data=>{
      this.questions=data;
    })
  }

  Answer(choice:string){
    if(this.questions[this.qnumber].answer.localeCompare(choice)){
      this.score++;
    } 
    this.sendClickInfo();
    this.qnumber++;
     
    if(this.qnumber>this.clicknum)
      this.statu=false;
    if(this.qnumber==10 && this.nav) //if compettior waits user to go to result page
    {
      this.qService.result=this.score;
      this.qService.cresult=this.csore;
      this.route.navigate(['/result']);
    }  
  }
  
  public getMessage = () =>
  {
    this.signalRService.hubConnection.on("ReceiveMessage", ( message: string) => {
      alert("Rakibiniz "+message+" oyundan çıkış yapmıştır. Bekleme sayfasına yönlendiriliyorsunuz.");
      this.route.navigate(['/wait']);
  });
  }

  public getClickInfo = () =>
  {
    this.signalRService.hubConnection.on("ClickMessage", ( competitorScore: number) => {
    this.clicknum++;
    if(this.clicknum!=this.qnumber)
       alert("Rakibiniz hamlesini yaptı. Sizi bekliyor.");
    this.statu=true;
    this.csore=competitorScore;
    if(this.qnumber==this.clicknum && this.qnumber==10)//if user waits competitor to go to result page
    {
      this.qService.result=this.score;
      this.qService.cresult=this.csore;
      this.route.navigate(['/result']);
    }  
    else if(this.clicknum==10)
      this.nav=true;
  });
  }

  public sendClickInfo = () =>
  {
    this.signalRService.hubConnection.invoke("SendClickInfo",this.competitor,this.score);//send information about clickint to user`s rival
  }
}
           