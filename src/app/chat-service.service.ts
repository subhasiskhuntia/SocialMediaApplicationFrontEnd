import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http:HttpClient) { }
  
  public getPreviousMessages(sender:string,receiver:string):Observable<any>{
    return this.http.get("http://localhost:8081/previousMessage/"+sender+"/"+receiver);
  }
  public getContactedPerson(sender:string):Observable<any>{
    return this.http.get("http://localhost:8081/getPreviousContactedPerson/"+sender);
  }
}
