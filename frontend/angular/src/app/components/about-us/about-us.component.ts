import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  lat: number = 42.073100;
  lng: number = -83.212700;

  constructor() { }

  ngOnInit(): void {
  }

  // if (navigator)
  //   {
  //   navigator.geolocation.getCurrentPosition( pos => {
  //       this.lng = +pos.coords.longitude;
  //       this.lat = +pos.coords.latitude;
  //     });
  //   }

}
