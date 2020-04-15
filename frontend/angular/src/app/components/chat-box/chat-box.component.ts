import { Component, OnInit, Input } from '@angular/core';
import { WebSocketService } from 'src/app/_services/web-socket.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  username: string = '';
  message: string = '';
  @Input() messages: any[] = [];
  @Input() users: any[] = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.username = this.getUsername().split('"')[5];
    this.webSocketService.listen('passing message').subscribe((msg) => {
      this.messages.push(msg);
    })
    this.webSocketService.emit('new user', this.username);
    this.webSocketService.listen('update users').subscribe(user => {
      if (!this.users.includes(user)) {
        this.users.push(user);
      }
    })
  }

  onSubmit() {
    const data = {
      username: this.username,
      msg: this.message,
      time: this.getCurrentTime()
    }
    this.webSocketService.emit('entered message', data);
    this.message = '';
  }

  getCurrentTime() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let ampm = '';
    let minuteString = '';

    if (hour < 12) {
      ampm = 'AM';
    }
    else {
      ampm = 'PM';
    }

    if (minute < 10) {
      minuteString = "0" + minute.toString();
    }
    else {
      minuteString = minute.toString();
    }

    if (hour % 12 === 0) {
      hour = 12;
    }
    else {
      hour = hour % 12;
    }

    let currentTime = hour.toString() + ":" + minuteString + " " + ampm;
    return currentTime;
  }

  getUsername() {
    return localStorage.getItem('currentUser');
  }
}
