import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';


@Component({
  selector: 'app-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.css']
})
export class WaitComponent implements OnInit {

  constructor(private signalRService:SignalRService,private route: Router,private http:HttpClient,private qService: QuizService) { }

  usr: User;
  routeB: boolean;
  ngOnInit() {
    this.routeB=true; 
    this.addTransferUserListener();   
    this.startHttpRequest();
  }
 
  private startHttpRequest = () => { 
    this.http.get<User>('http://localhost:5000/api/login/'+this.signalRService.connectId).subscribe(data =>{
      this.usr=data;
    })
  }

  public addTransferUserListener = () => {
    this.signalRService.hubConnection.on('transferuser', (data) => {
      this.usr=data;
      if(this.usr.statu.localeCompare("Hazır")==0 && this.routeB)
      {
        localStorage.setItem('rival', JSON.stringify(this.usr.gameId));
        this.routeB=false;
        this.route.navigate(['/quiz']);
      }
    });
  }
}