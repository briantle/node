import { Component, OnInit, Input } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/_services/web-socket.service';
import { NewsService } from 'src/app/_services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  description = ""
  temp = 0.0
  city = ""

  latestNews: any

  username: string = '';
  message: string = '';
  @Input() messages: any[] = [];
  @Input() users: any[] = [];

  lat: any
  lng: any
  apikey = "f1acae29578b3e0eb189dd6cf97306c3"


  constructor(private http: HttpClient, private newsServ: NewsService, private auth: AuthenticationService, private router: Router, private webSocketService: WebSocketService) 
  {

    this.newsServ.getLatestNews().subscribe(data => {
      this.latestNews = data
    })

    if (navigator)
    {
      navigator.geolocation.getCurrentPosition( pos => {
         this.lng = +pos.coords.longitude;
         this.lat = +pos.coords.latitude;

         const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" + this.lng + "&appid=" + this.apikey
         this.http.get<any>(url).subscribe((data) => {
           console.log(data)

            

          this.city = data.name
          this.temp = Math.round((Number.parseFloat(data.main.temp) - 273.15) * 9/5 + 32)

          this.description = data.weather[0].description

         })

       });
     }
   }

//(0K − 273.15) × 9/5 + 32 = -459.7°F (0K = temp)


  ngOnInit(): void {

    console.log(this.getUsername())

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


  logout(){
    this.auth.logout()
    this.router.navigate(["/login"])
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
