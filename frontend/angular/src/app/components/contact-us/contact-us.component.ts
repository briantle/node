import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/_services/contact-us.service';
import { ContactUs } from 'src/app/models/contact-us';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  email: string = '';
  query: string = '';
  showMsg: boolean = false;
  loginCheck: Boolean

  constructor(private contactUsService: ContactUsService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout()
    this.router.navigate(["/login"])
  }

  addNewQuery() {

    console.log("form email: " + this.email)
    console.log("form query: " + this.query)

    const data = {
      email: this.email,
      query: this.query
    }
    console.log("[" + data + "]");


    console.log("email: " + data.email)

    this.contactUsService.addNewQuery(data).subscribe(() => {
      this.router.navigate([''])
      this.showMsg= true;
    },
    () => {
      console.log("Failed to submit")
    })
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
