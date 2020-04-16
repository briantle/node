import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {
  
  constructor(private auth: AuthenticationService, private router: Router) { }


  ngOnInit(): void {
  }
  logout(){
    this.auth.logout()
    this.router.navigate(["/login"])
  }
}
