import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  
  loginCheck: Boolean
  lat: number = 42.073100;
  lng: number = -83.212700;

  constructor(private auth: AuthenticationService, private router: Router) { }

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
