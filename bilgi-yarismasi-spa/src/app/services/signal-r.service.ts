import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})

export class SignalRService {

  public users:User[]; 
  public connectId;
  public hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5000/login')//buraya http://localhost:5000/api yazınca çalışmadı nedenini sor.
    .build();
    this.hubConnection
      .start()
      .then(()=>{
        var hub = this.hubConnection ;
        var connectionUrl = hub["connection"].transport.webSocket.url ;//connected url
        var splitted = connectionUrl.split("id=", ); 
        this.connectId=splitted[1]; //connected id eklendi 
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  
  public addTransferUsersDataListener = () => {
    this.hubConnection.on('transferusersdata', (data) => {
      this.users = data;
    });
  } 
  
}
