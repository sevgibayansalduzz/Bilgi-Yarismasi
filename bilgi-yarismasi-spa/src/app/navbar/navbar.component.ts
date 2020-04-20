import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private signalRService:SignalRService) {   }

  ngOnInit() {
  }

  SignOut(){
    this.signalRService.hubConnection.invoke("RemoveUser",this.signalRService.connectId);
    localStorage.clear();
    this.router.navigate(['/login']); 
  }

}
