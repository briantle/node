import { Component, OnInit, Input } from '@angular/core';
import { News } from 'src/app/models/news';
import { NewsService } from 'src/app/_services/news.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';

const apiUrl = 'http://localhost:4000/news'

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

  searchText = '';
  @Input() userList: News;
  news: string [];
  loginCheck: Boolean;
 

  constructor(private auth: AuthenticationService, private newsService: NewsService, private httpService: HttpClient, private router: Router) { }

  ngOnInit(): void {

    //Need to check if nothing is in local storage
  
  if (localStorage.getItem("currentUser").split('"')[3] != "admin" ) {
      alert("Unauthorized")
      this.router.navigate(["/home"])
    }
    else
    {
      console.log("authorized")
      this.httpService.get(apiUrl + "/").subscribe(
        data => {
          this.news = data as string [];	 
        },
        () => {
          console.log('cant find data')
          })
    }
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

  logout(){
    this.auth.logout()
    this.router.navigate(["/login"])
  }




}
