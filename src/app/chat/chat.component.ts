import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;
  title = 'WebSocketChatRoom';
  greetings: any[] = [];
  name: string = 'bisu';
  disabled = true;
  newmessage!: string;
  stompClient: any;
  recipient!: string;
  constructor(
    private router: Router,
    private chatService: ChatServiceService
  ) {
    console.log(router.url.substring(6));
    this.recipient = router.url.substring(6);
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  ngOnInit() {
    this.connect();
    this.getPreviousMessage();
    this.scrollToBottom();
  }
  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }
  connect() {
    const socket = new SockJS('http://localhost:8081/server1');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: string) {
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe(
        '/topic/return-to/' + _this.recipient,
        function (response: any) {
          console.log('inside subscribe');

          console.log(JSON.parse(response.body));
          _this.showMessage(JSON.parse(response.body));
        }
      );
      console.log('this is next line');
    });
  }
  sendMessage() {
    this.stompClient.send(
      '/app/message/' + this.recipient,
      {},
      JSON.stringify({
        sender: this.name,
        receiver: this.recipient,
        message: this.newmessage,
        time: new Date(),
      })
    );
    this.newmessage = '';
  }
  showMessage(message: any) {
    console.log('showing message');
    this.greetings.push(message);
  }
  getPreviousMessage() {
    console.log('calling the previous message');

    this.chatService
      .getPreviousMessages(this.name, this.recipient)
      .subscribe((result) => {
        if (this.greetings.length == 0) {
          this.greetings = result;
          console.log(result);
        }
      },error=>console.log(error),
      ()=>{
        this.scrollToBottom();
      }
      );
  }
}
