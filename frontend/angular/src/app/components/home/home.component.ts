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

  loginCheck: Boolean

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
