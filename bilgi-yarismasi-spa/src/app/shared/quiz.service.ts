import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Question } from '../models/question';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class QuizService {


 //---------Properties-----------
readonly rootUrl="http://localhost:5000"; 
result:number;
cresult:number;


 //---------Helper Methods-------
  constructor(private http:HttpClient) { }

  /*s[0]*31^(n - 1) + s[1]*31^(n - 2) + ... + s[n - 1]*/
  hashString(str){
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
      hash = hash & hash;
    }
    return hash;
  }
 
  //-------Http Methods----------
  insertUser(ad: string, soyad: string,id: string){
    var msg = ad.concat( " " );
    msg=msg.concat(soyad); 
    var st='Bekliyor';
    var msgObject = {
      UserId: id,
      Name: msg,
      Statu: st,
      GameId:""
    };
    return this.http.post(this.rootUrl+'/api/login',msgObject);
  }

  getQuestions(){
    return this.http.get<Question[]>(this.rootUrl+'/api/quiz')
  }
  getUsers(){
    return this.http.get<User[]>(this.rootUrl+'/api/login')
  }
  getSpecificUser(id){
    return this.http.get<User>(this.rootUrl+'/api/login/'+id)
  }
  getUserName(){
    var usr =JSON.parse(localStorage.getItem('user'))
    return usr;
  }
  getUserId(){
    var usr =JSON.parse(localStorage.getItem('userid'))
    return usr;
  }
} 
