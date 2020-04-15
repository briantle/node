import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/_services/contact-us.service';
import { ContactUs } from 'src/app/models/contact-us';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  email: string = '';
  query: string = '';
  showMsg: boolean = false;

  constructor(private contactUsService: ContactUsService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewQuery() {
    const data = {
      email: this.email,
      query: this.query
    }
    console.log(data);
    this.contactUsService.addQuery(data).subscribe(() => {
      this.router.navigate([''])
      this.showMsg= true;
    },
    () => {
      console.log("Failed to submit")
    })
  }
}
