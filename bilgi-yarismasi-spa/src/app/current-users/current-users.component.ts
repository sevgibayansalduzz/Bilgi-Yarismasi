import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from '../services/signal-r.service';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.css'] 
}) 
export class CurrentUsersComponent implements OnInit {

  constructor(public signalRService: SignalRService, private http:HttpClient) { }

  ngOnInit() {
    this.signalRService.addTransferUsersDataListener();   
    this.startHttpRequest();
  }
 
  private startHttpRequest = () => {
    this.http.get('http://localhost:5000/api/login')
  }
} 

