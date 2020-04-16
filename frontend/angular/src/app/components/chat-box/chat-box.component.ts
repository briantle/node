import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/_services/web-socket.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

username: string = '';
message: string = '';
messages: any[] = [];
users: any[] = [];
loginCheck: Boolean

  constructor(private webSocketService: WebSocketService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    if(localStorage.getItem("currentUser") != null) {
      this.username = this.getUsername().split('"')[3];
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
    else {
      alert("Need to login to access chat")
      this.router.navigate(['/home']);
    }
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

  logout(){
    this.auth.logout()
    this.router.navigate(["/login"])
  }

  getCurrentUser() {
    this.auth.currentUser.subscribe(data => {
      if(data != null) {
        if(data.username != null) {
          this.loginCheck = true
        }
        else {
          this.loginCheck = false;
        }
      }
      else {
        this.loginCheck = false;
      }
    });
    return this.loginCheck;
  }

}