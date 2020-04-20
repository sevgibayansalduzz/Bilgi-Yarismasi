import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';

@Component({ 
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private qService: QuizService, private signalRService: SignalRService  ) { }

  ngOnInit() {
    this.signalRService.hubConnection.invoke("RemoveUser",this.signalRService.connectId);
    localStorage.clear();
  }

}
